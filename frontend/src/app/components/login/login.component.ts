import { Component, OnInit } from '@angular/core';  // Herramienta para crear una pagina
import { CommonModule } from '@angular/common';  // Funciones basicas que se usan siempre
import { FormsModule } from '@angular/forms';  // Para poder usar formularios con inputs
import { Router } from '@angular/router';  // Para cambiar de pagina
import { SecurityService } from '../../services/security.service';  // Servicio de seguridad

// Esto le dice a Angular que esta clase es una pagina
@Component({
  selector: 'app-login',  // Nombre que usamos para mostrar esta pagina
  standalone: true,       // Funciona de manera independiente
  imports: [CommonModule, FormsModule],  // Herramientas que necesita para funcionar
  templateUrl: './login.component.html',  // Archivo donde esta el HTML
  styleUrls: ['./login.component.css']    // Archivo donde estan los estilos
})
export class LoginComponent implements OnInit {
  // Datos que el usuario escribe en el formulario
  usuario: string = '';               // Nombre de usuario o email
  password: string = '';              // Contraseña
  recordarUsuario: boolean = false;   // Si quiere que recordemos su usuario
  isLoading: boolean = false;         // Para mostrar estado de carga
  errorMessage: string = '';          // Para mostrar errores

  // Aqui le decimos a Angular que servicios necesitamos usar
  constructor(
    private router: Router,              // Router para cambiar de pagina
    private securityService: SecurityService  // Servicio de seguridad
  ) {
    // No hacer nada aquí que dependa del navegador
  }

  ngOnInit() {
    // Verificar si ya hay una sesión activa al cargar (solo en el navegador)
    this.securityService.restoreSession();
    if (this.securityService.isAuthenticated()) {
      this.redirectToUserHome();
    }
    
    // Cargar usuario recordado
    if (typeof window !== 'undefined' && localStorage) {
      const rememberedUser = localStorage.getItem('rememberedUser');
      if (rememberedUser) {
        this.usuario = rememberedUser;
        this.recordarUsuario = true;
      }
    }
  }

  onSubmit() {
    // Cuando el usuario hace clic en "Iniciar Sesion"
    if (this.usuario && this.password) {
      this.isLoading = true;
      this.errorMessage = '';

      // Usar el SecurityService para autenticar
      this.securityService.login(this.usuario, this.password).subscribe({
        next: (response) => {
          this.isLoading = false;
          
          if (response.success) {
            console.log('Login exitoso:', response.user);
            
            // Guardar usuario si eligió recordar (solo en el navegador)
            if (typeof window !== 'undefined' && localStorage) {
              if (this.recordarUsuario) {
                localStorage.setItem('rememberedUser', this.usuario);
              } else {
                localStorage.removeItem('rememberedUser');
              }
            }

            // Redirigir según el rol del usuario
            this.redirectToUserHome();
          } else {
            this.errorMessage = response.message || 'Error en el login';
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Error de conexión. Intenta nuevamente.';
          console.error('Error en login:', error);
        }
      });
    } else {
      this.errorMessage = 'Por favor completa todos los campos';
    }
  }

  // Redirigir al usuario según su rol
  private redirectToUserHome(): void {
    const role = this.securityService.getUserRole();
    
    switch (role) {
      case 'admin':
      case 'administrador':
        this.router.navigate(['/administrador']);
        break;
      case 'directivo':
        this.router.navigate(['/directivo']);
        break;
      default:
        this.router.navigate(['/encuestas']);
        break;
    }
  }

  onForgotPassword() {
    // Cuando hace clic en "Olvidaste tu contraseña"
    console.log('Recuperar contraseña para:', this.usuario);
    // Aqui iria la logica para enviar un email de recuperacion
    alert('Funcionalidad de recuperación de contraseña no implementada aún.');
  }
}