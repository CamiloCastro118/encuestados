import { Component, OnInit } from '@angular/core';  // Herramientas para crear paginas
import { CommonModule } from '@angular/common';  // Funciones basicas que se usan siempre
import { FormsModule } from '@angular/forms';  // Para poder usar formularios con inputs

// Estructura de datos para un usuario del sistema
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: 'encuestado' | 'directivo' | 'administrador';
  fechaRegistro: Date;
  activo: boolean;
}

// Estructura de datos para una encuesta
interface Encuesta {
  id: number;
  titulo: string;
  descripcion: string;
  fechaCreacion: Date;
  fechaLimite: Date;
  estado: 'activa' | 'finalizada' | 'borrador';
  respuestas: number;
}

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  // Controla que seccion se muestra en pantalla
  vistaActual: 'dashboard' | 'usuarios' | 'encuestas' | 'reportes' = 'dashboard';
  
  // Numeros importantes para mostrar en el panel principal
  estadisticas = {
    totalUsuarios: 0,        // Cuantos usuarios hay registrados
    usuariosActivos: 0,      // Cuantos usuarios han usado el sistema hoy
    totalEncuestas: 0,       // Cuantas encuestas hay en total
    encuestasActivas: 0,     // Cuantas encuestas se pueden responder ahora
    respuestasHoy: 0,        // Cuantas respuestas se han recibido hoy
    respuestasTotal: 0       // Cuantas respuestas hay en total desde siempre
  };

  // Variables para manejar la lista de usuarios
  usuarios: Usuario[] = [];                // Lista completa de usuarios
  usuarioSeleccionado: Usuario | null = null;  // Usuario que estamos editando
  filtroUsuarios = '';                     // Texto para buscar usuarios
  
  // Variables para manejar la lista de encuestas
  encuestas: Encuesta[] = [];              // Lista completa de encuestas
  encuestaSeleccionada: Encuesta | null = null;  // Encuesta que estamos editando
  filtroEncuestas = '';                    // Texto para buscar encuestas

  // Variables para el formulario de crear usuario nuevo
  nuevoUsuario: Partial<Usuario> = {};     // Datos del usuario que se esta creando
  mostrarFormUsuario = false;              // Si se muestra o no el formulario

  // Este componente no necesita servicios externos
  constructor() {}

  ngOnInit(): void {
    // Cuando se abre la pagina, cargar todos los datos
    this.cargarDatos();
  }

  cargarDatos(): void {
    // Traer toda la informacion necesaria para el panel
    this.cargarUsuarios();          // Lista de usuarios
    this.cargarEncuestas();         // Lista de encuestas
    this.actualizarEstadisticas();  // Numeros del dashboard
  }

  cargarUsuarios(): void {
    // Datos de ejemplo
    this.usuarios = [
      {
        id: 1,
        nombre: 'Juan Pérez',
        email: 'juan.perez@universidad.edu',
        rol: 'encuestado',
        fechaRegistro: new Date('2024-01-15'),
        activo: true
      },
      {
        id: 3,
        nombre: 'Carlos López',
        email: 'carlos.lopez@universidad.edu',
        rol: 'directivo',
        fechaRegistro: new Date('2024-01-20'),
        activo: false
      }
    ];
  }

  cargarEncuestas(): void {
  
    this.encuestas = [
      {
        id: 1,
        titulo: 'Satisfacción del Servicio',
        descripcion: 'Evaluación de servicios universitarios',
        fechaCreacion: new Date('2024-10-01'),
        fechaLimite: new Date('2024-10-31'),
        estado: 'activa',
        respuestas: 45
      },
      {
        id: 2,
        titulo: 'Evaluación de Servicio',
        descripcion: 'Evaluación de calidad del servicio',
        fechaCreacion: new Date('2024-09-15'),
        fechaLimite: new Date('2024-10-15'),
        estado: 'finalizada',
        respuestas: 123
      }
    ];
  }

  actualizarEstadisticas(): void {
    this.estadisticas.totalUsuarios = this.usuarios.length;
    this.estadisticas.usuariosActivos = this.usuarios.filter(u => u.activo).length;
    this.estadisticas.totalEncuestas = this.encuestas.length;
    this.estadisticas.encuestasActivas = this.encuestas.filter(e => e.estado === 'activa').length;
    this.estadisticas.respuestasTotal = this.encuestas.reduce((sum, e) => sum + e.respuestas, 0);
    this.estadisticas.respuestasHoy = Math.floor(Math.random() * 20) + 5; // Simulado
  }

  cambiarVista(vista: 'dashboard' | 'usuarios' | 'encuestas' | 'reportes'): void {
    this.vistaActual = vista;
  }

  // Gestion de usuarios
  get usuariosFiltrados(): Usuario[] {
    if (!this.filtroUsuarios) return this.usuarios;
    return this.usuarios.filter(u => 
      u.nombre.toLowerCase().includes(this.filtroUsuarios.toLowerCase()) ||
      u.email.toLowerCase().includes(this.filtroUsuarios.toLowerCase()) ||
      u.rol.toLowerCase().includes(this.filtroUsuarios.toLowerCase())
    );
  }

  seleccionarUsuario(usuario: Usuario): void {
    this.usuarioSeleccionado = usuario;
  }

  toggleUsuarioActivo(usuario: Usuario): void {
    usuario.activo = !usuario.activo;
    this.actualizarEstadisticas();
  }

  eliminarUsuario(usuario: Usuario): void {
    if (confirm(`¿Está seguro de eliminar al usuario ${usuario.nombre}?`)) {
      this.usuarios = this.usuarios.filter(u => u.id !== usuario.id);
      this.actualizarEstadisticas();
    }
  }

  abrirFormularioUsuario(): void {
    this.nuevoUsuario = {};
    this.mostrarFormUsuario = true;
  }

  guardarUsuario(): void {
    if (this.nuevoUsuario.nombre && this.nuevoUsuario.email && this.nuevoUsuario.rol) {
      const usuario: Usuario = {
        id: this.usuarios.length + 1,
        nombre: this.nuevoUsuario.nombre,
        email: this.nuevoUsuario.email,
        rol: this.nuevoUsuario.rol,
        fechaRegistro: new Date(),
        activo: true
      };
      this.usuarios.push(usuario);
      this.mostrarFormUsuario = false;
      this.actualizarEstadisticas();
    }
  }

  cancelarFormUsuario(): void {
    this.mostrarFormUsuario = false;
    this.nuevoUsuario = {};
  }

  // Gestion de encuestas
  get encuestasFiltradas(): Encuesta[] {
    if (!this.filtroEncuestas) return this.encuestas;
    return this.encuestas.filter(e => 
      e.titulo.toLowerCase().includes(this.filtroEncuestas.toLowerCase()) ||
      e.descripcion.toLowerCase().includes(this.filtroEncuestas.toLowerCase())
    );
  }

  cambiarEstadoEncuesta(encuesta: Encuesta, nuevoEstado: 'activa' | 'finalizada' | 'borrador'): void {
    encuesta.estado = nuevoEstado;
    this.actualizarEstadisticas();
  }

  eliminarEncuesta(encuesta: Encuesta): void {
    if (confirm(`¿Está seguro de eliminar la encuesta "${encuesta.titulo}"?`)) {
      this.encuestas = this.encuestas.filter(e => e.id !== encuesta.id);
      this.actualizarEstadisticas();
    }
  }

  exportarReportes(): void {
    console.log('Exportando reportes...');
    alert('Funcionalidad de exportación en desarrollo');
  }
}