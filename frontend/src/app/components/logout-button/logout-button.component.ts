import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css']
})
export class LogoutButtonComponent {
  constructor(
    private router: Router,
    private securityService: SecurityService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  onLogout(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Limpiar sesión del usuario
      localStorage.removeItem('userSession');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userId');
    }
    
    // Navegar al login
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('userSession') !== null;
    }
    return false; // En el servidor, asumimos que no está logueado
  }
}