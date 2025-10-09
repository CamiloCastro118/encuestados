import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SecurityService } from '../services/security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {}

  canActivate(): boolean {
    // Verificar si el usuario está autenticado
    if (this.securityService.isAuthenticated()) {
      return true; // Permitir acceso
    } else {
      // Redirigir al login si no está autenticado
      this.router.navigate(['/login']);
      return false; // Denegar acceso
    }
  }
}