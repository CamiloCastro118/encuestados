// Herramienta para definir las paginas de la app
import { Routes } from '@angular/router';

// Traer todas las paginas que hicimos
import { HomeComponent } from './components/home/home.component';  // Pagina de inicio
import { LoginComponent } from './components/login/login.component';  // Pagina de login
import { EncuestasComponent } from './components/encuestas/encuestas.component';  // Pagina de encuestas

//import { NavbarComponent } from './components/navbar/navbar.component';  // Menu de navegacion

// Lista de todas las direcciones web de la app
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Si alguien va a la raiz, mandarlo a /home
  { path: 'home', component: HomeComponent },  // home muestra la pagina de inicio
  { path: 'login', component: LoginComponent },  // login muestra el login
  { path: 'encuestas', component: EncuestasComponent },  // encuestas muestra las encuestas
  //{ path: 'administrador', component: AdministradorComponent },  // administrador muestra panel admin
  //{ path: 'directivo', component: DirectivoComponent },  // directivo muestra panel directivo
  //{ path: 'navbar', component: NavbarComponent },  // navbar muestra el menu
  { path: '**', redirectTo: '/home' } // Si alguien escribe una direccion que no existe, mandarlo a home
];
