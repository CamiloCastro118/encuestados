import { Component, OnInit } from '@angular/core';  // Herramienta para crear una pagina
import { CommonModule } from '@angular/common';  // Funciones basicas que se usan siempre
import { Router } from '@angular/router';  // Para cambiar de pagina
import { SecurityService } from '../../services/security.service';  // Servicio de seguridad

// Esto le dice a Angular que esta clase es una pagina
@Component({
  selector: 'app-home',   // Nombre que usamos para mostrar esta pagina
  standalone: true,       // Funciona de manera independiente
  imports: [CommonModule],  // Herramientas que necesita para funcionar
  templateUrl: './home.component.html',     // Archivo donde esta el HTML
  styleUrls: ['./home.component.css']       // Archivo donde estan los estilos
})
export class HomeComponent implements OnInit {
  
  // Aqui le decimos a Angular que servicios necesitamos usar
  constructor(
    private router: Router,  // Router para cambiar de pagina
    private securityService: SecurityService  // Servicio de seguridad
  ) {}

  ngOnInit() {
    // Restaurar sesión si existe
    this.securityService.restoreSession();
  }

  navegarA(ruta: string): void {
    // Cuando el usuario hace clic en un boton yllevarlo a esa pagina
    this.router.navigate([ruta]);
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.securityService.isAuthenticated();
  }

  // Obtener nombre del usuario actual
  getUserName(): string {
    const user = this.securityService.getCurrentUser();
    return user?.usuario || 'Usuario';
  }

  // Obtener rol del usuario actual
  getUserRole(): string {
    return this.securityService.getUserRole();
  }
}