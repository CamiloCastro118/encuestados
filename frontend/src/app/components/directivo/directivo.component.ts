import { Component, OnInit } from '@angular/core';  // Herramientas para crear paginas
import { CommonModule } from '@angular/common';  // Funciones basicas que se usan siempre
import { FormsModule } from '@angular/forms';  // Para poder usar formularios con inputs
import { Router } from '@angular/router';  // Para cambiar de pagina

// Estructura de datos para un reporte generado
interface Reporte {
  id: number;
  titulo: string;
  descripcion: string;
  fechaGeneracion: Date;
  tipo: 'satisfaccion' | 'desempeño' | 'general';
  datos: any;
}

// Estructura de datos para las metricas de una encuesta
interface MetricaEncuesta {
  encuestaId: number;
  titulo: string;
  totalRespuestas: number;
  promedioSatisfaccion: number;
  tendencia: 'subiendo' | 'bajando' | 'estable';
}

@Component({
  selector: 'app-directivo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './directivo.component.html',
  styleUrls: ['./directivo.component.css']
})
export class DirectivoComponent implements OnInit {
  // Controla que seccion se muestra en pantalla
  vistaActual: 'dashboard' | 'reportes' | 'metricas' | 'configuracion' = 'dashboard';
  Math = Math; // Para poder usar funciones matematicas en el HTML
  
  // Informacion principal que se muestra en el dashboard
  resumenEjecutivo = {
    satisfaccionGeneral: 85,                      // Porcentaje de satisfaccion general
    tendenciaMensual: '+5%',                      // Si esta subiendo o bajando
    totalRespuestasRecientes: 234,                // Cuantas respuestas hay este mes
    indicadorCritico: 'Área de TI necesita atención',  // Que area tiene problemas
    ultimaActualizacion: new Date()               // Cuando se actualizo por ultima vez
  };

  // Datos de satisfaccion por cada area de la institucion
  metricasPorArea = [
    { area: 'Servicios Académicos', satisfaccion: 88, respuestas: 156, tendencia: 'subiendo' },
    { area: 'Infraestructura', satisfaccion: 78, respuestas: 89, tendencia: 'estable' },
    { area: 'Tecnología', satisfaccion: 65, respuestas: 67, tendencia: 'bajando' },
    { area: 'Administrativo', satisfaccion: 82, respuestas: 134, tendencia: 'subiendo' }
  ];

  // Reportes disponibles
  reportes: Reporte[] = [];
  reporteSeleccionado: Reporte | null = null;

  // Configuración
  configuracion = {
    frecuenciaReportes: 'semanal',
    notificacionesEmail: true,
    umbralAlerta: 70,
    areasMonitoreo: ['todas']
  };

  // servicios  que necesitamos usar
  constructor(private router: Router) {}  // Router para cambiar de pagina

  ngOnInit(): void {
    this.cargarReportes();
  }

  cargarReportes(): void {
    // Datos de ejemplo
    this.reportes = [
      {
        id: 1,
        titulo: 'Reporte Mensual de Satisfacción',
        descripcion: 'Análisis completo de la satisfacción estudiantil durante el mes',
        fechaGeneracion: new Date('2024-10-01'),
        tipo: 'satisfaccion',
        datos: {
          satisfaccionPromedio: 85,
          areasDestacadas: ['Biblioteca', 'Laboratorios'],
          areasMejora: ['Cafetería', 'Wi-Fi']
        }
      },
      {
        id: 2,
        titulo: 'Evaluación de Servicios Institucionales',
        descripcion: 'Resultados consolidados de evaluaciones de servicios del semestre',
        fechaGeneracion: new Date('2024-09-28'),
        tipo: 'general',
        datos: {
          promedioGeneral: 4.2,
          serviciosDestacados: 15,
          recomendacionesMejora: 8
        }
      },
      {
        id: 3,
        titulo: 'Análisis de Tendencias Trimestrales',
        descripcion: 'Evolución de indicadores clave durante el trimestre',
        fechaGeneracion: new Date('2024-09-30'),
        tipo: 'general',
        datos: {
          crecimientoSatisfaccion: '+8%',
          participacionEncuestas: '92%',
          areasEmergentes: ['Deportes', 'Cultura']
        }
      }
    ];
  }

  cambiarVista(vista: 'dashboard' | 'reportes' | 'metricas' | 'configuracion'): void {
    this.vistaActual = vista;
  }

  verReporte(reporte: Reporte): void {
    this.reporteSeleccionado = reporte;
  }

  cerrarReporte(): void {
    this.reporteSeleccionado = null;
  }

  exportarReporte(reporte: Reporte): void {
    console.log('Exportando reporte:', reporte.titulo);
    alert(`Exportando reporte: ${reporte.titulo}\nEsta funcionalidad se implementará próximamente.`);
  }

  generarReportePersonalizado(): void {
    console.log('Generando reporte personalizado...');
    alert('Funcionalidad de reporte personalizado en desarrollo');
  }

  guardarConfiguracion(): void {
    console.log('Configuración guardada:', this.configuracion);
    alert('Configuración guardada exitosamente');
  }

  obtenerIconoTendencia(tendencia: string): string {
    switch(tendencia) {
      case 'subiendo': return '📈';
      case 'bajando': return '📉';
      case 'estable': return '➡️';
      default: return '📊';
    }
  }

  obtenerColorSatisfaccion(satisfaccion: number): string {
    if (satisfaccion >= 80) return 'alta';
    if (satisfaccion >= 70) return 'media';
    return 'baja';
  }

  navegarAEncuestas(): void {
    this.router.navigate(['/encuestas']);
  }

  navegarAAdmin(): void {
    this.router.navigate(['/administrador']);
  }
}