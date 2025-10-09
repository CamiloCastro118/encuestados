import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SecurityService } from '../services/security.service';

@Injectable({
  providedIn: 'root'
})
export class DirectivoGuard implements CanActivate {

  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {}

  canActivate(): boolean {
    // Verificar si el usuario está autenticado Y es directivo
    if (this.securityService.isAuthenticated() && this.securityService.isDirectivo()) {
      return true; // Permitir acceso
    } else {
      // Redirigir según el caso
      if (!this.securityService.isAuthenticated()) {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/home']); // Usuario autenticado pero no directivo
      }
      return false; // Denegar acceso
    }
  }
}