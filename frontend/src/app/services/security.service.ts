import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Esta parte define como se ve la respuesta de seguridad
export interface SecurityCheck {
  isValid: boolean;     // Si la validacion paso o no
  message: string;      // Mensaje para mostrar al usuario
  riskLevel: 'low' | 'medium' | 'high';  // Que tan peligroso es
  blocked: boolean;     // Si el usuario esta bloqueado
}

// Aqui guardamos la informacion de cada usuario conectado
export interface UserSession {
  userId: number;              // Quien es el usuario
  ipAddress: string;           // Desde donde se conecta
  userAgent: string;           // Que navegador usa
  sessionStart: Date;          // Cuando empezo la sesion
  lastActivity: Date;          // Ultima vez que hizo algo
  encuestasRespondidas: number[];  // Que encuestas ya completo
  intentosRespuesta: number;   // Cuantas veces intento responder
  bloqueado: boolean;          // Si esta castigado
  tiempoBloqueo?: Date;        // Hasta cuando esta castigado
}

// Esto le dice a Angular que esta clase es un servicio que se puede usar en toda la app
@Injectable({
  providedIn: 'root'  // Hacer que este servicio este disponible en toda la aplicacion
})
export class SecurityService {
  private sesionesActivas = new Map<string, UserSession>();
  private ipsBloqueadas = new Set<string>();
  private respuestasRecientes = new Map<string, Date[]>();

  // Aqui ponemos las reglas de seguridad
  private readonly CONFIG = {
    TIEMPO_MINIMO_RESPUESTA: 30,     // Minimo 30 segundos para responder
    TIEMPO_MAXIMO_RESPUESTA: 3600,   // Maximo 1 hora o se vence
    MAX_INTENTOS_POR_HORA: 5,        // Solo 5 intentos por hora
    MAX_RESPUESTAS_POR_IP_DIA: 50,   // Maximo 50 respuestas por dia desde la misma computadora
    TIEMPO_BLOQUEO_IP: 24 * 60 * 60 * 1000, // 24 horas de castigo
    // Palabras que no se pueden usar en las respuestas
    PALABRAS_SPAM: [
      'spam', 'fake', 'test', 'prueba', 'aaa', 'bbb', 'ccc',
      'asdfgh', 'qwerty', '123456', 'aaaaa', 'nnnnn'
    ],
    // Patrones sospechosos en las respuestas
    PATRONES_SOSPECHOSOS: [
      /(.)\1{4,}/,           // Letras repetidas muchas veces
      /^[a-z]{1,3}$/i,      // Respuestas muy cortas
      /^\d+$/,              // Solo numeros
      /^[^a-zA-Z0-9\s]+$/   // Solo caracteres raros
    ]
  };

  constructor() {
    // Cada 30 minutos limpiamos las sesiones viejas para no llenar la memoria
    setInterval(() => {
      this.limpiarSesionesExpiradas();
    }, 30 * 60 * 1000);
  }

  // Crear una nueva sesion cuando alguien entra al sistema
  inicializarSesion(userId: number, ipAddress: string, userAgent: string): string {
    // Creamos un ID unico para esta sesion
    const sessionId = this.generarSessionId(userId, ipAddress);
    
    // Guardamos toda la informacion del usuario
    const sesion: UserSession = {
      userId,
      ipAddress,
      userAgent,
      sessionStart: new Date(),     // Cuando empezo
      lastActivity: new Date(),     // Ultima actividad
      encuestasRespondidas: [],     // Lista vacia al inicio
      intentosRespuesta: 0,         // Sin intentos al inicio
      bloqueado: false              // No esta bloqueado al inicio
    };

    // Guardamos la sesion en memoria
    this.sesionesActivas.set(sessionId, sesion);
    return sessionId;
  }

  // Revisar si el usuario puede ver una encuesta antes de mostrarla
  validarAccesoEncuesta(sessionId: string, encuestaId: number): Observable<SecurityCheck> {
    // Buscamos la sesion del usuario
    const sesion = this.sesionesActivas.get(sessionId);
    
    // Si no tiene sesion valida, no puede continuar
    if (!sesion) {
      return of({
        isValid: false,
        message: 'Sesion no valida. Por favor, inicia sesion nuevamente.',
        riskLevel: 'high',
        blocked: true
      });
    }

    // Revisar si la computadora esta castigada
    if (this.ipsBloqueadas.has(sesion.ipAddress)) {
      return of({
        isValid: false,
        message: 'Tu direccion IP ha sido bloqueada temporalmente por actividad sospechosa.',
        riskLevel: 'high',
        blocked: true
      });
    }

    // Revisar si ya respondio esta encuesta antes
    if (sesion.encuestasRespondidas.includes(encuestaId)) {
      return of({
        isValid: false,
        message: 'Ya has respondido esta encuesta.',
        riskLevel: 'medium',
        blocked: true
      });
    }

    // Contar cuantas respuestas ha dado hoy desde esta computadora
    const respuestasHoy = this.contarRespuestasIPHoy(sesion.ipAddress);
    if (respuestasHoy >= this.CONFIG.MAX_RESPUESTAS_POR_IP_DIA) {
      // Si ya respondio demasiado, castigar la IP
      this.bloquearIP(sesion.ipAddress);
      return of({
        isValid: false,
        message: 'Has excedido el limite diario de respuestas desde esta direccion IP.',
        riskLevel: 'high',
        blocked: true
      });
    }

    // Revisar si ha intentado responder demasiado rapido
    if (sesion.intentosRespuesta > this.CONFIG.MAX_INTENTOS_POR_HORA) {
      // Castigar al usuario por intentar hacer trampa
      sesion.bloqueado = true;
      sesion.tiempoBloqueo = new Date(Date.now() + this.CONFIG.TIEMPO_BLOQUEO_IP);
      
      return of({
        isValid: false,
        message: 'Has excedido el limite de intentos por hora. Intentalo mas tarde.',
        riskLevel: 'high',
        blocked: true
      });
    }

    // Si paso todas las pruebas, puede continuar
    return of({
      isValid: true,
      message: 'Acceso autorizado',
      riskLevel: 'low',
      blocked: false
    });
  }

  // Validar respuesta antes de enviar
  validarRespuesta(
    sessionId: string, 
    encuestaId: number, 
    respuestas: any, 
    tiempoRespuesta: number
  ): Observable<SecurityCheck> {
    const sesion = this.sesionesActivas.get(sessionId);
    
    if (!sesion) {
      return of({
        isValid: false,
        message: 'Sesión expirada',
        riskLevel: 'high',
        blocked: true
      });
    }

    // Validar tiempo de respuesta
    if (tiempoRespuesta < this.CONFIG.TIEMPO_MINIMO_RESPUESTA) {
      sesion.intentosRespuesta++;
      return of({
        isValid: false,
        message: `Respuesta enviada muy rápido. Tómate al menos ${this.CONFIG.TIEMPO_MINIMO_RESPUESTA} segundos para leer las preguntas.`,
        riskLevel: 'high',
        blocked: false
      });
    }

    if (tiempoRespuesta > this.CONFIG.TIEMPO_MAXIMO_RESPUESTA) {
      return of({
        isValid: false,
        message: 'La sesión ha expirado. Por favor, vuelve a cargar la encuesta.',
        riskLevel: 'medium',
        blocked: false
      });
    }

    // Analizar contenido de respuestas
    const analisisContenido = this.analizarContenidoRespuestas(respuestas);
    if (!analisisContenido.isValid) {
      sesion.intentosRespuesta++;
      return of(analisisContenido);
    }

    // Validar patrones de comportamiento
    const analisisComportamiento = this.analizarPatronesComportamiento(sesion, tiempoRespuesta);
    if (!analisisComportamiento.isValid) {
      return of(analisisComportamiento);
    }

    // Registrar respuesta exitosa
    this.registrarRespuestaExitosa(sessionId, encuestaId, sesion.ipAddress);

    return of({
      isValid: true,
      message: 'Respuesta válida',
      riskLevel: 'low',
      blocked: false
    });
  }

  // Analizar contenido de respuestas
  private analizarContenidoRespuestas(respuestas: any): SecurityCheck {
    const textos: string[] = [];
    
    // Extraer todas las respuestas de texto
    Object.values(respuestas).forEach(respuesta => {
      if (typeof respuesta === 'string' && respuesta.trim().length > 0) {
        textos.push(respuesta.toLowerCase().trim());
      }
    });

    // Verificar palabras spam
    for (const texto of textos) {
      for (const palabraSpam of this.CONFIG.PALABRAS_SPAM) {
        if (texto.includes(palabraSpam.toLowerCase())) {
          return {
            isValid: false,
            message: 'Se detectó contenido potencialmente spam en las respuestas.',
            riskLevel: 'high',
            blocked: false
          };
        }
      }

      // Verificar patrones sospechosos
      for (const patron of this.CONFIG.PATRONES_SOSPECHOSOS) {
        if (patron.test(texto)) {
          return {
            isValid: false,
            message: 'Se detectó un patrón sospechoso en las respuestas. Por favor, proporciona respuestas más detalladas.',
            riskLevel: 'medium',
            blocked: false
          };
        }
      }
    }

    // Verificar respuestas idénticas
    const respuestasUnicas = new Set(textos);
    if (textos.length > 1 && respuestasUnicas.size === 1) {
      return {
        isValid: false,
        message: 'Se detectaron respuestas idénticas. Por favor, proporciona respuestas variadas.',
        riskLevel: 'medium',
        blocked: false
      };
    }

    return {
      isValid: true,
      message: 'Contenido válido',
      riskLevel: 'low',
      blocked: false
    };
  }

  // Analizar patrones de comportamiento
  private analizarPatronesComportamiento(sesion: UserSession, tiempoRespuesta: number): SecurityCheck {
    // Verificar si el tiempo de respuesta es sospechosamente constante
    const respuestasRecientesKey = `${sesion.userId}_${sesion.ipAddress}`;
    const tiemposAnteriores = this.respuestasRecientes.get(respuestasRecientesKey) || [];
    
    if (tiemposAnteriores.length >= 3) {
      // Si todos los tiempos son muy similares (diferencia menor a 5 segundos)
      const tiemposSegundos = tiemposAnteriores.map(t => Math.floor((Date.now() - t.getTime()) / 1000));
      const diferenciasMinimas = tiemposSegundos.every((tiempo, index, arr) => {
        if (index === 0) return true;
        return Math.abs(tiempo - arr[index - 1]) < 5;
      });

      if (diferenciasMinimas) {
        return {
          isValid: false,
          message: 'Se detectó un patrón de respuesta automatizado.',
          riskLevel: 'high',
          blocked: false
        };
      }
    }

    return {
      isValid: true,
      message: 'Comportamiento normal',
      riskLevel: 'low',
      blocked: false
    };
  }

  // Registrar respuesta exitosa
  private registrarRespuestaExitosa(sessionId: string, encuestaId: number, ipAddress: string): void {
    const sesion = this.sesionesActivas.get(sessionId);
    if (sesion) {
      sesion.encuestasRespondidas.push(encuestaId);
      sesion.lastActivity = new Date();
      sesion.intentosRespuesta = 0; // Reset contador de intentos
    }

    // Registrar tiempo de respuesta por IP
    const key = `${sesion?.userId}_${ipAddress}`;
    const tiempos = this.respuestasRecientes.get(key) || [];
    tiempos.push(new Date());
    
    // Mantener solo los últimos 5 tiempos
    if (tiempos.length > 5) {
      tiempos.splice(0, tiempos.length - 5);
    }
    
    this.respuestasRecientes.set(key, tiempos);
  }

  // Contar respuestas de IP en las últimas 24 horas
  private contarRespuestasIPHoy(ipAddress: string): number {
    const hace24Horas = new Date(Date.now() - 24 * 60 * 60 * 1000);
    let contador = 0;

    this.respuestasRecientes.forEach((tiempos, key) => {
      if (key.includes(ipAddress)) {
        contador += tiempos.filter(tiempo => tiempo > hace24Horas).length;
      }
    });

    return contador;
  }

  // Bloquear IP
  private bloquearIP(ipAddress: string): void {
    this.ipsBloqueadas.add(ipAddress);
    
    // Desbloquear automáticamente después del tiempo configurado
    setTimeout(() => {
      this.ipsBloqueadas.delete(ipAddress);
    }, this.CONFIG.TIEMPO_BLOQUEO_IP);
  }

  // Generar ID de sesión
  private generarSessionId(userId: number, ipAddress: string): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2);
    return `${userId}_${ipAddress.replace(/\./g, '_')}_${timestamp}_${random}`;
  }

  // Limpiar sesiones expiradas
  private limpiarSesionesExpiradas(): void {
    const hace2Horas = new Date(Date.now() - 2 * 60 * 60 * 1000);
    
    this.sesionesActivas.forEach((sesion, sessionId) => {
      if (sesion.lastActivity < hace2Horas) {
        this.sesionesActivas.delete(sessionId);
      }
    });

    // Limpiar respuestas recientes antiguas
    this.respuestasRecientes.forEach((tiempos, key) => {
      const tiemposFiltrados = tiempos.filter(tiempo => tiempo > hace2Horas);
      if (tiemposFiltrados.length === 0) {
        this.respuestasRecientes.delete(key);
      } else {
        this.respuestasRecientes.set(key, tiemposFiltrados);
      }
    });
  }

  // Obtener estadísticas de seguridad
  obtenerEstadisticasSeguridad(): Observable<any> {
    return of({
      sesionesActivas: this.sesionesActivas.size,
      ipsBloqueadas: this.ipsBloqueadas.size,
      respuestasRecientes24h: Array.from(this.respuestasRecientes.values())
        .flat()
        .filter(tiempo => tiempo > new Date(Date.now() - 24 * 60 * 60 * 1000))
        .length,
      configuracion: this.CONFIG
    });
  }

  // Desbloquear IP manualmente (para administradores)
  desbloquearIP(ipAddress: string): void {
    this.ipsBloqueadas.delete(ipAddress);
  }

  // Obtener IPs bloqueadas
  obtenerIPsBloqueadas(): string[] {
    return Array.from(this.ipsBloqueadas);
  }
}