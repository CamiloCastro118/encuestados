// Traer las herramientas basicas de Angular
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';  // Para manejar las paginas
import { routes } from './app.routes';  // Lista de todas las paginas

// Configuracion principal de toda la aplicacion
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]  // Decirle a Angular cuales son nuestras paginas
};
