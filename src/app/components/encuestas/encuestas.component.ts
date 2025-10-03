import { Component, OnInit, OnDestroy } from '@angular/core';  // Herramientas para crear paginas
import { CommonModule } from '@angular/common';  // Funciones basicas que se usan siempre
import { FormsModule } from '@angular/forms';  // Para poder usar formularios con inputs
import { EncuestasService, Encuesta, Pregunta, RespuestaCompleta } from '../../services/encuestas.service';  // Servicio para manejar encuestas
import { SecurityService, SecurityCheck } from '../../services/security.service';  // Servicio de seguridad
import { Subscription } from 'rxjs';  // Para manejar suscripciones

// Esto le dice a Angular que esta clase es una pagina
@Component({
  selector: 'app-encuestas',  // Nombre que usamos para mostrar esta pagina
  standalone: true,           // Funciona de manera independiente
  imports: [CommonModule, FormsModule],  // Herramientas que necesita para funcionar
  templateUrl: './encuestas.component.html',  // Archivo donde esta el HTML
  styleUrls: ['./encuestas.component.css']    // Archivo donde estan los estilos
})
export class EncuestasComponent implements OnInit, OnDestroy {
  // Lista de todas las encuestas disponibles
  encuestas: Encuesta[] = [];
  // La encuesta que el usuario esta completando ahora
  encuestaSeleccionada: Encuesta | null = null;
  // Las respuestas que va dando el usuario
  respuestas: { [key: number]: any } = {};
  // Informacion del usuario que esta usando el sistema
  usuarioActual = { id: 1, nombre: 'Usuario Demo' };
  // ID unico de la sesion de seguridad
  sessionId: string = '';
  // Cuando empezo a responder la encuesta (para medir tiempo)
  tiempoInicio: Date = new Date();
  
  // Variables para mostrar el estado de la pantalla
  cargando = false;           // Si esta procesando algo
  mensaje = '';               // Mensaje para mostrar al usuario
  tipoMensaje: 'success' | 'error' | 'warning' = 'success';  // Color del mensaje
  
  // Lista de suscripciones para limpiar al salir
  private subscriptions: Subscription[] = [];
  
  // Aqui le decimos a Angular que servicios necesitamos usar
  constructor(
    private encuestasService: EncuestasService,  // Para manejar las encuestas
    private securityService: SecurityService     // Para validar seguridad
  ) {}

  ngOnInit(): void {
    // Cuando se abre la pagina, hacer estas dos cosas:
    this.inicializarSesion();  // Crear sesion de seguridad
    this.cargarEncuestas();    // Traer la lista de encuestas
  }

  ngOnDestroy(): void {
    // Cuando el usuario sale de la pagina, limpiar todo
    this.subscriptions.forEach(sub => sub.unsubscribe());  // Cancelar suscripciones
    if (this.sessionId) {
      this.encuestasService.cerrarSesion(this.usuarioActual.id);  // Cerrar sesion
    }
  }

  private inicializarSesion(): void {
    // Informacion basica para crear la sesion de seguridad
    const ipAddress = '192.168.1.100';  // En un sistema real esto vendria del servidor
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'Server';

    // Pedirle al servicio que cree una sesion segura
    const sub = this.encuestasService.inicializarSesionSegura(
      this.usuarioActual.id, 
      ipAddress, 
      userAgent
    ).subscribe({
      next: (sessionId) => {
        // Si todo salio bien, guardar el ID de sesion
        this.sessionId = sessionId;
      },
      error: (error) => {
        // Si algo salio mal, avisar al usuario
        this.mostrarMensaje('Error al inicializar sesión: ' + error.message, 'error');
      }
    });
    
    // Agregar esta suscripcion a la lista para limpiarla despues
    this.subscriptions.push(sub);
  }

  cargarEncuestas(): void {
    // Mostrar el indicador de carga mientras se traen los datos
    this.cargando = true;
    
    // Estar pendiente de cuando cambien las encuestas en el servicio
    const sub = this.encuestasService.encuestas$.subscribe({
      next: (encuestas) => {
        // Cuando lleguen las encuestas, solo mostrar las que estan activas
        this.encuestas = encuestas.filter(e => e.estado === 'activa');
        this.cargando = false;  // Quitar el indicador de carga
      },
      error: (error) => {
        // Si algo sale mal, avisar al usuario
        this.mostrarMensaje('Error al cargar encuestas: ' + error.message, 'error');
        this.cargando = false;
      }
    });
    
    // Agregar esta suscripcion a la lista para limpiarla despues
    this.subscriptions.push(sub);
  }

  seleccionarEncuesta(encuesta: Encuesta): void {
    // Verificar que tenemos una sesion valida antes de continuar
    if (!this.sessionId) {
      this.mostrarMensaje('Sesión no válida. Recarga la página.', 'error');
      return;
    }

    // Mostrar que estamos trabajando
    this.cargando = true;
    
    // Pedirle al servicio que verifique si el usuario puede hacer esta encuesta
    const sub = this.encuestasService.validarAccesoEncuestaSegura(
      this.usuarioActual.id, 
      encuesta.id
    ).subscribe({
      next: (validacion: SecurityCheck) => {
        this.cargando = false;  // Ya termino de verificar
        
        if (validacion.isValid) {
          // Si puede hacer la encuesta, prepararla
          this.encuestaSeleccionada = encuesta;
          this.respuestas = {};  // Limpiar respuestas anteriores
          this.tiempoInicio = new Date();  // Marcar cuando empezo
          this.mostrarMensaje('Encuesta cargada correctamente', 'success');
        } else {
          // Si no puede hacer la encuesta, explicar por que
          this.mostrarMensaje(validacion.message, validacion.riskLevel === 'high' ? 'error' : 'warning');
        }
      },
      error: (error) => {
        this.cargando = false;  // Quitar indicador de carga
        this.mostrarMensaje('Error de validación: ' + error.message, 'error');
      }
    });
    
    // Agregar esta suscripcion a la lista
    this.subscriptions.push(sub);
  }

  enviarRespuestas(): void {
    // Verificar que tenemos todo lo necesario para enviar
    if (!this.encuestaSeleccionada || !this.sessionId) {
      this.mostrarMensaje('No hay encuesta seleccionada', 'error');
      return;
    }

    // Revisar que el usuario contesto todas las preguntas importantes
    const preguntasRequeridas = this.encuestaSeleccionada.preguntas.filter(p => p.requerida);
    const respuestasVacias = preguntasRequeridas.some(p => !this.respuestas[p.id] || this.respuestas[p.id] === '');
    
    if (respuestasVacias) {
      this.mostrarMensaje('Por favor, responde todas las preguntas requeridas', 'warning');
      return;
    }

    // Mostrar que estamos guardando las respuestas
    this.cargando = true;
    
    // Enviar todas las respuestas al servicio
    const sub = this.encuestasService.responderEncuestaSegura(
      this.usuarioActual.id,
      this.encuestaSeleccionada.id,
      this.respuestas,
      this.tiempoInicio
    ).subscribe({
      next: (respuesta: RespuestaCompleta) => {
        this.cargando = false;  // Ya termino de guardar
        this.mostrarMensaje('¡Respuesta enviada exitosamente!', 'success');
        
        // Esperar un poco y luego limpiar todo para volver al inicio
        setTimeout(() => {
          this.encuestaSeleccionada = null;  // Quitar encuesta actual
          this.respuestas = {};  // Limpiar respuestas
          this.cargarEncuestas();  // Actualizar la lista
        }, 2000);
      },
      error: (error) => {
        this.cargando = false;  // Quitar indicador de carga
        this.mostrarMensaje('Error al enviar respuesta: ' + error.message, 'error');
      }
    });
    
    // Agregar esta suscripcion a la lista
    this.subscriptions.push(sub);
  }

  volver(): void {
    // Limpiar todo para volver a la lista de encuestas
    this.encuestaSeleccionada = null;
    this.respuestas = {};
  }

  private mostrarMensaje(texto: string, tipo: 'success' | 'error' | 'warning'): void {
    // Guardar el mensaje para mostrarlo en pantalla
    this.mensaje = texto;
    this.tipoMensaje = tipo;
    
    // Quitar el mensaje automaticamente despues de 5 segundos
    setTimeout(() => {
      this.mensaje = '';
    }, 5000);
  }

  getTiempoTranscurrido(): string {
    if (!this.tiempoInicio) return '0:00';
    
    const segundos = Math.floor((Date.now() - this.tiempoInicio.getTime()) / 1000);
    const minutos = Math.floor(segundos / 60);
    const seg = segundos % 60;
    
    return `${minutos}:${seg.toString().padStart(2, '0')}`;
  }

  isRespuestaVacia(preguntaId: number): boolean {
    return !this.respuestas[preguntaId] || this.respuestas[preguntaId] === '';
  }

  estaVencida(fecha: Date): boolean {
    return new Date() > fecha;
  }
}