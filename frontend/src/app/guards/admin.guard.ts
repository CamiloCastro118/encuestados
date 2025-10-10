import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { SecurityService } from '../services/security.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
    ,
    private securityService: SecurityService
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // En el servidor, siempre redirigir al login
    if (!isPlatformBrowser(this.platformId)) {
      this.router.navigate(['/login']);
      return false;
    }

    // Usar SecurityService para determinar autenticación y rol
    if (this.securityService.isAuthenticated()) {
      const role = this.securityService.getUserRole();
      if (role === 'administrador' || role === 'admin') {
        return true;
      }
      // Autenticado pero sin permisos de administrador
      this.router.navigate(['/home']);
      return false;
    }

    // No autenticado
    this.router.navigate(['/login']);
    return false;
  }
}