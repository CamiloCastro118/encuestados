import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { SecurityService } from '../services/security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private securityService: SecurityService
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // En el servidor, siempre redirigir al login
    if (!isPlatformBrowser(this.platformId)) {
      this.router.navigate(['/login']);
      return false;
    }
    // Usar SecurityService para decidir si el usuario está autenticado
    if (this.securityService.isAuthenticated()) {
      return true;
    }
    // No token -> redirigir al login
    this.router.navigate(['/login']);
    return false;
  }
}