import { Component, OnInit } from '@angular/core';  // Herramientas para crear paginas
import { CommonModule } from '@angular/common';  // Funciones basicas que se usan siempre
import { Router, NavigationEnd } from '@angular/router';  // Para cambiar de pagina y saber cuando cambia
import { filter } from 'rxjs/operators';  // Para filtrar eventos

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
  currentUser = {
    nombre: 'Usuario Demo',
    rol: 'encuestado',
    avatar: 'https://via.placeholder.com/40x40/007bff/white?text=U'
  };

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
  constructor(private router: Router) {}  // Router para saber en que pagina estamos

  ngOnInit(): void {
    // Cuando se carga el componente, hacer estas cosas:
    
    // Estar pendiente de cuando el usuario cambia de pagina
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.url;  // Actualizar en que pagina estamos
      this.detectUserRole();  // Detectar el rol cada vez que cambia la ruta
    });

    // Saber en que pagina estamos al inicio
    this.currentRoute = this.router.url;

    // Detectar que tipo de usuario es para mostrar las opciones correctas
    this.detectUserRole();
  }

  detectUserRole(): void {
    // Averiguar que tipo de usuario es segun donde esta navegando
    const path = this.router.url;
    if (path.includes('administrador')) {
      this.currentUser.rol = 'administrador';
      this.currentUser.nombre = 'Admin Demo';
    } else if (path.includes('directivo')) {
      this.currentUser.rol = 'directivo';
      this.currentUser.nombre = 'Director Demo';
    } else if (path.includes('encuestas') || path.includes('home') || path === '/') {
      this.currentUser.rol = 'encuestado';
      this.currentUser.nombre = 'Encuestado';
    } else {
      this.currentUser.rol = 'encuestado';
      this.currentUser.nombre = 'Encuestado';
    }
  }

  get visibleMenuItems(): MenuItem[] {
    return this.menuItems.filter(item => 
      item.roles.includes(this.currentUser.rol)
    );
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
    // Lógica de logout
    console.log('Cerrando sesión...');
    this.router.navigate(['/login']);
  }

  getRoleDisplayName(role: string): string {
    const roleNames: { [key: string]: string } = {
      'encuestado': 'Encuestado',
      'directivo': 'Directivo',
      'administrador': 'Administrador'
    };
    return roleNames[role] || role;
  }

  getRoleIcon(role: string): string {
    const roleIcons: { [key: string]: string } = {
      'encuestado': '�',
      'directivo': '👔',
      'administrador': '👨‍💻'
    };
    return roleIcons[role] || '👤';
  }
}