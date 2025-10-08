// Definir todas las paginas de la aplicacion
import { Routes } from '@angular/router';

// Traer todos los componentes (paginas) que creamos
import { HomeComponent } from './components/home/home.component';  // Pagina de inicio
import { LoginComponent } from './components/login/login.component';  // Pagina de login
import { EncuestasComponent } from './components/encuestas/encuestas.component';  // Pagina de encuestas
import { AdministradorComponent } from './components/administrador/administrador.component';  // Panel de admin
import { DirectivoComponent } from './components/directivo/directivo.component';  // Panel de directivo

// Lista de todas las direcciones de la aplicacion
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Si no pone nada, ir a login
  { path: 'home', component: HomeComponent },  // /home muestra la pagina de inicio
  { path: 'login', component: LoginComponent },  // /login muestra el login
  { path: 'encuestas', component: EncuestasComponent },  // /encuestas muestra las encuestas
  { path: 'administrador', component: AdministradorComponent },  // /administrador muestra panel admin
  { path: 'directivo', component: DirectivoComponent },  // /directivo muestra panel directivo
  { path: '**', redirectTo: '/login' } // Si pone algo que no existe, ir a login
];
