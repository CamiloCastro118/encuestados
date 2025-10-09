import { Component } from '@angular/core';  // Herramienta para crear una pagina
import { CommonModule } from '@angular/common';  // Funciones basicas que se usan siempre
import { FormsModule } from '@angular/forms';  // Para poder usar formularios con inputs
import { Router } from '@angular/router';  // Para cambiar de pagina

// Esto le dice a Angular que esta clase es una pagina
@Component({
  selector: 'app-login',  // Nombre que usamos para mostrar esta pagina
  standalone: true,       // Funciona de manera independiente
  imports: [CommonModule, FormsModule],  // Herramientas que necesita para funcionar
  templateUrl: './login.component.html',  // Archivo donde esta el HTML
  styleUrls: ['./login.component.css']    // Archivo donde estan los estilos
})
export class LoginComponent {
  // Datos que el usuario escribe en el formulario
  usuario: string = '';               // Nombre de usuario o email
  password: string = '';              // Contraseña
  recordarUsuario: boolean = false;   // Si quiere que recordemos su usuario

  // Aqui le decimos a Angular que servicios necesitamos usar
  constructor(private router: Router) {}  // Router para cambiar de pagina

  onSubmit() {
    // Cuando el usuario hace clic en "Iniciar Sesion"
    if (this.usuario && this.password) {
      // Solo continuar si escribio algo en ambos campos
      console.log('Intento de login:', this.usuario);
      
      // Decidir a donde mandarlo segun el tipo de usuario
      if (this.usuario.includes('admin')) {
        // Si es administrador, al panel de administracion
        this.router.navigate(['/administrador']);
      } else if (this.usuario.includes('directivo')) {
        // Si es directivo, al panel directivo
        this.router.navigate(['/directivo']);
      } else {
        // Si es usuario normal, a las encuestas
        this.router.navigate(['/encuestas']);
      }
    }
  }

  onForgotPassword() {
    // Cuando hace clic en "Olvidaste tu contraseña"
    console.log('Recuperar contraseña');
    // Aqui iria la logica para enviar un email de recuperacion
  }
}