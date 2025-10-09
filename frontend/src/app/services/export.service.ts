import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EncuestasService, Encuesta, RespuestaCompleta, Usuario } from './encuestas.service';

// Opciones para personalizar como se exportan los datos
export interface ExportOptions {
  incluirMetadatos?: boolean;         // Si incluir informacion extra como fechas
  incluirRespuestasVacias?: boolean;  // Si incluir respuestas sin completar
  formatoFecha?: 'dd/MM/yyyy' | 'yyyy-MM-dd' | 'MM/dd/yyyy';  // Como mostrar las fechas
  separador?: ',' | ';' | '\t';       // Que caracter usar para separar columnas
}

// Esto le dice a Angular que esta clase es un servicio que se puede usar en toda la app
@Injectable({
  providedIn: 'root'  // Hacer que este servicio este disponible en toda la aplicacion
})
export class ExportService {

  constructor(private encuestasService: EncuestasService) {}

  exportarEncuestaCSV(encuestaId: number, opciones: ExportOptions = {}): Observable<{ success: boolean; data?: string; filename?: string; error?: string }> {
    try {
      // Configuracion por defecto para la exportacion
      const configuracion: Required<ExportOptions> = {
        incluirMetadatos: true,         // Si incluir informacion extra
        incluirRespuestasVacias: false, // No incluir respuestas vacias
        formatoFecha: 'dd/MM/yyyy',     // Formato de fecha colombiano
        separador: ',',                 // Separar columnas con comas
        ...opciones                     // Sobrescribir con opciones del usuario
      };

      let csvContent = '';              // Aqui se va armando el archivo CSV
      const sep = configuracion.separador;  // Atajo para el separador

      // Traer todos los datos necesarios para crear el reporte
      const encuestas = this.encuestasService.obtenerEncuestas();
      const respuestas = this.encuestasService.obtenerRespuestas();
      const usuarios = this.encuestasService.obtenerUsuarios();

      // Procesar los datos cuando lleguen
      encuestas.subscribe(enc => {
        const encuesta = enc.find(e => e.id === encuestaId);  // Buscar la encuesta especifica
        if (!encuesta) {
          throw new Error('Encuesta no encontrada');
        }

        respuestas.subscribe(resp => {
          usuarios.subscribe(usu => {
            const respuestasEncuesta = resp.filter(r => r.encuestaId === encuestaId);

            // Metadatos de la encuesta
            if (configuracion.incluirMetadatos) {
              csvContent += `# Exportación de Encuesta\n`;
              csvContent += `# Título${sep}${this.escaparCSV(encuesta.titulo)}\n`;
              csvContent += `# Descripción${sep}${this.escaparCSV(encuesta.descripcion)}\n`;
              csvContent += `# Fecha Creación${sep}${this.formatearFecha(encuesta.fechaCreacion, configuracion.formatoFecha)}\n`;
              csvContent += `# Fecha Límite${sep}${this.formatearFecha(encuesta.fechaLimite, configuracion.formatoFecha)}\n`;
              csvContent += `# Estado${sep}${encuesta.estado}\n`;
              csvContent += `# Total Respuestas${sep}${respuestasEncuesta.length}\n`;
              csvContent += `# Fecha Exportación${sep}${this.formatearFecha(new Date(), configuracion.formatoFecha)}\n`;
              csvContent += `\n`;
            }

            // Encabezados
            let encabezados = [
              'ID_Respuesta',
              'Usuario_ID',
              'Usuario_Nombre',
              'Usuario_Email',
              'Usuario_Rol',
              'Fecha_Respuesta',
              'Tiempo_Respuesta_Segundos',
              'IP_Address'
            ];

            // Agregar columnas por cada pregunta
            encuesta.preguntas.forEach(pregunta => {
              encabezados.push(`P${pregunta.id}_${this.limpiarNombreColumna(pregunta.texto)}`);
            });

            csvContent += encabezados.join(sep) + '\n';

            // Datos de respuestas
            respuestasEncuesta.forEach(respuesta => {
              const usuario = usu.find(u => u.id === respuesta.usuarioId);
              
              let fila = [
                respuesta.id.toString(),
                respuesta.usuarioId.toString(),
                usuario ? this.escaparCSV(usuario.nombre) : 'Usuario no encontrado',
                usuario ? this.escaparCSV(usuario.email) : '',
                usuario ? usuario.rol : '',
                this.formatearFecha(respuesta.fechaCompletado, configuracion.formatoFecha),
                (respuesta.tiempoRespuesta || 0).toString(),
                respuesta.ipAddress || ''
              ];

              // Agregar respuestas por pregunta
              encuesta.preguntas.forEach(pregunta => {
                const valorRespuesta = respuesta.respuestas[pregunta.id];
                if (valorRespuesta !== undefined && valorRespuesta !== null) {
                  fila.push(this.escaparCSV(valorRespuesta.toString()));
                } else {
                  fila.push(configuracion.incluirRespuestasVacias ? '' : 'Sin respuesta');
                }
              });

              csvContent += fila.join(sep) + '\n';
            });

            // Si no hay respuestas y se incluyen vacías
            if (respuestasEncuesta.length === 0 && configuracion.incluirRespuestasVacias) {
              let filaVacia = new Array(encabezados.length).fill('');
              csvContent += filaVacia.join(sep) + '\n';
            }
          });
        });
      });

      const filename = `encuesta_${encuestaId}_${this.obtenerTimestamp()}.csv`;

      return of({
        success: true,
        data: csvContent,
        filename: filename
      });

    } catch (error) {
      return of({
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido al exportar'
      });
    }
  }

  exportarEstadisticasCSV(encuestaId: number): Observable<{ success: boolean; data?: string; filename?: string; error?: string }> {
    return this.encuestasService.obtenerEstadisticasEncuesta(encuestaId).pipe(
      map(estadisticas => {
        if (!estadisticas) {
          return { success: false, error: 'No se pudieron obtener las estadísticas' };
        }

        try {
          let csvContent = '';
          const sep = ',';

          // Información general
          csvContent += `# Estadísticas de Encuesta\n`;
          csvContent += `# Título,${this.escaparCSV(estadisticas.titulo)}\n`;
          csvContent += `# Total Respuestas,${estadisticas.totalRespuestas}\n`;
          csvContent += `# Tiempo Promedio Respuesta,${Math.round(estadisticas.tiempoPromedioRespuesta)} segundos\n`;
          csvContent += `\n`;

          // Análisis por pregunta
          csvContent += `Pregunta_ID,Texto_Pregunta,Tipo,Total_Respuestas,Análisis\n`;

          estadisticas.preguntasAnalisis.forEach((analisis: any) => {
            let textoAnalisis = '';

            if (analisis.tipo === 'escala') {
              textoAnalisis = `Promedio: ${analisis.promedio?.toFixed(2) || 0}`;
              if (analisis.distribucion) {
                const dist = Object.entries(analisis.distribucion)
                  .map(([valor, cantidad]) => `${valor}: ${cantidad}`)
                  .join('; ');
                textoAnalisis += ` | Distribución: ${dist}`;
              }
            } else if (analisis.tipo === 'multiple') {
              if (analisis.distribucion) {
                textoAnalisis = Object.entries(analisis.distribucion)
                  .map(([opcion, cantidad]) => `${opcion}: ${cantidad}`)
                  .join('; ');
              }
            } else if (analisis.tipo === 'abierta') {
              textoAnalisis = `${analisis.totalRespuestas} respuestas de texto`;
            }

            csvContent += [
              analisis.preguntaId,
              this.escaparCSV(analisis.texto),
              analisis.tipo,
              analisis.totalRespuestas,
              this.escaparCSV(textoAnalisis)
            ].join(sep) + '\n';
          });

          const filename = `estadisticas_encuesta_${encuestaId}_${this.obtenerTimestamp()}.csv`;

          return {
            success: true,
            data: csvContent,
            filename: filename
          };

        } catch (error) {
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Error al generar estadísticas CSV'
          };
        }
      })
    );
  }

  exportarUsuariosCSV(): Observable<{ success: boolean; data?: string; filename?: string; error?: string }> {
    return this.encuestasService.obtenerUsuarios().pipe(
      map(usuarios => {
        try {
          let csvContent = '';
          const sep = ',';

          // Encabezados
          csvContent += ['ID', 'Nombre', 'Email', 'Rol', 'Fecha_Registro', 'Estado'].join(sep) + '\n';

          // Datos de usuarios
          usuarios.forEach(usuario => {
            csvContent += [
              usuario.id.toString(),
              this.escaparCSV(usuario.nombre),
              this.escaparCSV(usuario.email),
              usuario.rol,
              this.formatearFecha(usuario.fechaRegistro, 'dd/MM/yyyy'),
              usuario.activo ? 'Activo' : 'Inactivo'
            ].join(sep) + '\n';
          });

          const filename = `usuarios_${this.obtenerTimestamp()}.csv`;

          return {
            success: true,
            data: csvContent,
            filename: filename
          };

        } catch (error) {
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Error al exportar usuarios'
          };
        }
      })
    );
  }

  descargarCSV(data: string, filename: string): void {
    // Agregar BOM para compatibilidad con Excel
    const BOM = '\uFEFF';
    const csvData = BOM + data;
    
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }

  private escaparCSV(valor: string): string {
    if (typeof valor !== 'string') {
      valor = String(valor);
    }
    
    // Escapar comillas dobles duplicándolas
    valor = valor.replace(/"/g, '""');
    
    // Envolver en comillas si contiene separadores, saltos de línea o comillas
    if (valor.includes(',') || valor.includes(';') || valor.includes('\n') || valor.includes('\r') || valor.includes('"')) {
      valor = `"${valor}"`;
    }
    
    return valor;
  }

  private limpiarNombreColumna(texto: string): string {
    return texto
      .replace(/[^\w\sáéíóúüñ]/gi, '') // Remover caracteres especiales excepto espacios y acentos
      .replace(/\s+/g, '_') // Reemplazar espacios con guiones bajos
      .substring(0, 50); // Limitar longitud
  }

  private formatearFecha(fecha: Date, formato: 'dd/MM/yyyy' | 'yyyy-MM-dd' | 'MM/dd/yyyy'): string {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear().toString();

    switch (formato) {
      case 'dd/MM/yyyy':
        return `${dia}/${mes}/${año}`;
      case 'yyyy-MM-dd':
        return `${año}-${mes}-${dia}`;
      case 'MM/dd/yyyy':
        return `${mes}/${dia}/${año}`;
      default:
        return `${dia}/${mes}/${año}`;
    }
  }

  private obtenerTimestamp(): string {
    const ahora = new Date();
    const año = ahora.getFullYear();
    const mes = (ahora.getMonth() + 1).toString().padStart(2, '0');
    const dia = ahora.getDate().toString().padStart(2, '0');
    const hora = ahora.getHours().toString().padStart(2, '0');
    const minuto = ahora.getMinutes().toString().padStart(2, '0');
    
    return `${año}${mes}${dia}_${hora}${minuto}`;
  }
}

// Necesario importar map de rxjs
import { map } from 'rxjs/operators';