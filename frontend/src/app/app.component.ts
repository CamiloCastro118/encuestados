// Herramientas basicas de Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

// Componentes
import { NavbarComponent } from './components/navbar/navbar.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { SecurityService } from './services/security.service';

// Componente principal de toda la aplicacion
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, NavbarComponent, LogoutButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  // Nombre de la aplicacion
  title = 'encuestas-app';
  showNavbar = false;

  constructor(
    private router: Router,
    private securityService: SecurityService
  ) {}

  ngOnInit() {
    // Escuchar cambios de ruta para mostrar/ocultar navbar
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Mostrar navbar solo en páginas autenticadas que no sean home ni login
      this.showNavbar = this.shouldShowNavbar(event.url);
    });

    // Verificar ruta inicial
    this.showNavbar = this.shouldShowNavbar(this.router.url);
  }

  private shouldShowNavbar(url: string): boolean {
    // No mostrar navbar en login
    if (url.includes('/login')) {
      return false;
    }
    
    // En home, mostrar navbar solo si está autenticado
    if (url === '/home' || url === '/' || url === '') {
      return this.securityService.isAuthenticated();
    }
    
    // En otras páginas protegidas, mostrar si está autenticado
    return this.securityService.isAuthenticated() && 
           (url.includes('/encuestas') || url.includes('/administrador') || url.includes('/directivo'));
  }
}
