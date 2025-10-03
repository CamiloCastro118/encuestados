import { Component } from '@angular/core';  // Herramienta para crear una pagina
import { CommonModule } from '@angular/common';  // Funciones basicas que se usan siempre
import { Router } from '@angular/router';  // Para cambiar de pagina
import { NavbarComponent } from '../navbar/navbar.component';  // El menu de navegacion

// Esto le dice a Angular que esta clase es una pagina
@Component({
  selector: 'app-home',   // Nombre que usamos para mostrar esta pagina
  standalone: true,       // Funciona de manera independiente
  imports: [CommonModule, NavbarComponent],  // Herramientas que necesita para funcionar
  templateUrl: './home.component.html',     // Archivo donde esta el HTML
  styleUrls: ['./home.component.css']       // Archivo donde estan los estilos
})
export class HomeComponent {
  
  // Aqui le decimos a Angular que servicios necesitamos usar
  constructor(private router: Router) {}  // Router para cambiar de pagina

  navegarA(ruta: string): void {
    // Cuando el usuario hace clic en un boton, llevarlo a esa pagina
    this.router.navigate([ruta]);
  }
}