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
      // Ocultar navbar solo en la página de login
      this.showNavbar = !event.url.includes('/login');
    });

    // Verificar ruta inicial
    this.showNavbar = !this.router.url.includes('/login');
  }
}
