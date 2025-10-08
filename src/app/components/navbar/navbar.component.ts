import { Component, OnInit } from '@angular/core';  // Herramientas para crear paginas
import { CommonModule } from '@angular/common';  // Funciones basicas que se usan siempre
import { Router, NavigationEnd } from '@angular/router';  // Para cambiar de pagina y saber cuando cambia
import { filter } from 'rxjs/operators';  // Para filtrar eventos
import { SecurityService } from '../../services/security.service';  // Servicio de seguridad

// Estructura de datos para cada opcion del menu
interface MenuItem {
  label: string;    // Texto que se muestra
  route: string;    // A donde va cuando hacen clic
  icon: string;     // Icono que se muestra
  roles: string[];  // Que tipos de usuario pueden verlo
}

// Esto le dice a Angular que esta clase es una pagina
@Component({
  selector: 'app-navbar',  // Nombre que usamos para mostrar esta pagina
  standalone: true,        // Funciona de manera independiente
  imports: [CommonModule], // Herramientas que necesita para funcionar
  templateUrl: './navbar.component.html',  // Archivo donde esta el HTML
  styleUrls: ['./navbar.component.css']    // Archivo donde estan los estilos
})
export class NavbarComponent implements OnInit {
  // Variables que controlan como se ve el menu
  isMenuOpen = false;        // Si el menu esta abierto en celular
  currentRoute = '';         // En que pagina estamos ahora
  
  // Informacion del usuario que esta usando el sistema
  currentUser: any = null;

  // Lista de todas las opciones del menu
  menuItems: MenuItem[] = [
    {
      label: 'Inicio',
      route: '/home',
      icon: '🏠',
      roles: ['encuestado', 'directivo', 'administrador']  // Todos pueden ver inicio
    },
    {
      label: 'Encuestas',
      route: '/encuestas',
      icon: '📋',
      roles: ['encuestado', 'directivo', 'administrador']  // Todos pueden ver encuestas
    },
    {
      label: 'Panel Directivo',
      route: '/directivo',
      icon: '📊',
      roles: ['directivo', 'administrador']  // Solo directivos y administradores
    },
    {
      label: 'Administración',
      route: '/administrador',
      icon: '⚙️',
      roles: ['administrador']  // Solo administradores
    }
  ];

  // Aqui le decimos a Angular que servicios necesitamos usar
  constructor(
    private router: Router,                    // Router para saber en que pagina estamos
    private securityService: SecurityService  // Servicio de seguridad
  ) {}

  ngOnInit(): void {
    // Obtener información del usuario actual
    this.currentUser = this.securityService.getCurrentUser();
    
    // Cuando se carga el componente, hacer estas cosas:
    
    // Estar pendiente de cuando el usuario cambia de pagina
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.url;  // Actualizar en que pagina estamos
    });

    // Saber en que pagina estamos al inicio
    this.currentRoute = this.router.url;
  }

  get visibleMenuItems(): MenuItem[] {
    if (!this.currentUser) return [];
    
    const userRole = this.securityService.getUserRole();
    return this.menuItems.filter(item => {
      // Mapear roles del sistema a roles del menú
      if (userRole === 'admin' || userRole === 'administrador') {
        return item.roles.includes('administrador');
      } else if (userRole === 'directivo') {
        return item.roles.includes('directivo') || item.roles.includes('encuestado');
      } else {
        return item.roles.includes('encuestado');
      }
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  navigate(route: string): void {
    this.router.navigate([route]);
    this.closeMenu();
  }

  isActiveRoute(route: string): boolean {
    return this.currentRoute === route || 
           (route !== '/home' && this.currentRoute.startsWith(route));
  }

  logout(): void {
    // Usar SecurityService para cerrar sesión
    console.log('Cerrando sesión...');
    this.securityService.logout();
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  getRoleDisplayName(): string {
    const role = this.securityService.getUserRole();
    const roleNames: { [key: string]: string } = {
      'user': 'Usuario',
      'directivo': 'Directivo', 
      'admin': 'Administrador',
      'administrador': 'Administrador'
    };
    return roleNames[role] || 'Usuario';
  }

  getRoleIcon(): string {
    const role = this.securityService.getUserRole();
    const roleIcons: { [key: string]: string } = {
      'user': '👤',
      'directivo': '👔',
      'admin': '👨‍💻',
      'administrador': '👨‍💻'
    };
    return roleIcons[role] || '👤';
  }

  getUserName(): string {
    return this.currentUser?.usuario || 'Usuario';
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.securityService.isAuthenticated();
  }
}