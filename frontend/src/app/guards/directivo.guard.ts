import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DirectivoGuard implements CanActivate {
  
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
    const userRole = localStorage.getItem('userRole');
    
    if (userSession && userRole === 'directivo') {
      // Usuario autenticado y con rol de directivo
      return true;
    } else if (userSession) {
      // Usuario autenticado pero sin permisos de directivo
      this.router.navigate(['/home']);
      return false;
    } else {
      // Usuario no autenticado, redirigir al login
      this.router.navigate(['/login']);
      return false;
    }
  }
}