// Traer las herramientas basicas de Angular
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';  // Para manejar las paginas
import { routes } from './app.routes';  // Lista de todas las paginas
import { EncuestasService } from './services/encuestas.service';  // Servicio de encuestas
import { SecurityService } from './services/security.service';  // Servicio de seguridad
import { ExportService } from './services/export.service';  // Servicio de exportación

// Configuracion principal de toda la aplicacion
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),  // Router normal
    EncuestasService,       // Servicio para manejar encuestas
    SecurityService,        // Servicio de seguridad
    ExportService          // Servicio de exportación
  ]
};
