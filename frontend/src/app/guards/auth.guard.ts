import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // En el servidor, siempre redirigir al login
    if (!isPlatformBrowser(this.platformId)) {
      this.router.navigate(['/login']);
      return false;
    }

    // Verificar si el usuario está autenticado
    const userSession = localStorage.getItem('userSession');
    
    if (userSession) {
      // Usuario autenticado, permitir acceso
      return true;
    } else {
      // Usuario no autenticado, redirigir al login
      this.router.navigate(['/login']);
      return false;
    }
  }
}