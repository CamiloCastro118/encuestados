// Definir todas las paginas de la aplicacion
import { Routes } from '@angular/router';

// Traer todos los componentes de las paginas
import { HomeComponent } from './components/home/home.component';  // Pagina de inicio
import { LoginComponent } from './components/login/login.component';  // Pagina de login
import { EncuestasComponent } from './components/encuestas/encuestas.component';  // Pagina de encuestas
import { AdministradorComponent } from './components/administrador/administrador.component';  // Panel de admin
import { DirectivoComponent } from './components/directivo/directivo.component';  // Panel de directivo

// Traer los guards de protección
import { AuthGuard } from './guards/auth.guard';  // Proteger rutas autenticadas
import { AdminGuard } from './guards/admin.guard';  // Proteger rutas de admin
import { DirectivoGuard } from './guards/directivo.guard';  // Proteger rutas de directivo

// Lista de todas las direcciones de la aplicacion con protección
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Si no pone nada, ir a home
  { path: 'login', component: LoginComponent },  // /login - acceso libre
  { 
    path: 'home', 
    component: HomeComponent  // /home - acceso libre para todos
  },
  { 
    path: 'encuestas', 
    component: EncuestasComponent,
    canActivate: [AuthGuard]  // Solo usuarios autenticados
  },
  { 
    path: 'administrador', 
    component: AdministradorComponent,
    canActivate: [AdminGuard]  // Solo administradores
  },
  { 
    path: 'directivo', 
    component: DirectivoComponent,
    canActivate: [DirectivoGuard]  // Solo directivos
  },
  { path: '**', redirectTo: '/home' } // Si pone algo que no existe, ir a home
];
