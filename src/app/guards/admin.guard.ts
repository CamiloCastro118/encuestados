import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SecurityService } from '../services/security.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {}

  canActivate(): boolean {
    // Verificar si el usuario está autenticado Y es administrador
    if (this.securityService.isAuthenticated() && this.securityService.isAdmin()) {
      return true; // Permitir acceso
    } else {
      // Redirigir según el caso
      if (!this.securityService.isAuthenticated()) {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/home']); // Usuario autenticado pero no admin
      }
      return false; // Denegar acceso
    }
  }
}