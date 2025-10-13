# Sistema de Encuestas - Fullstack# Aplicación de Encuestas - Fullstack# Sistema de Encuestas - Encuestados

Sistema completo para gestion de encuestas con **Angular 19** (frontend) y **Node.js + Express** (backend).



- **Frontend**: http://localhost:4200 (desarrollo)



### Frontend

- **Angular 19** - Framework principalnpm run install:all```

- **TypeScript** - Lenguaje de programacion


##  Comandos de Desarrollo



##  API Endpointsnpm run devnpm start                    # Servidor de desarrollo (http://localhost:4200)



### Autenticacion (`/api/auth`)# onpm run start:prod          # Servidor con configuración de producción

- `POST /login` - Iniciar sesion

- `POST /register` - Registrar usuarionpm startnpm run watch               # Compilación automática en modo desarrollo

- `POST /logout` - Cerrar sesion

- `GET /validate` - Validar token```



### Encuestas (`/api/encuestas`)# URLs de desarrollo:

- `GET /` - Listar encuestas

- `GET /:id` - Obtener encuesta# 🌐 Frontend: http://localhost:4200### Construcción y Deploy

- `POST /` - Crear encuesta

- `PUT /:id` - Actualizar encuesta# 🔧 Backend API: http://localhost:3000```bash

- `DELETE /:id` - Eliminar encuesta

- `POST /:id/respuesta` - Enviar respuesta```npm run build               # Construir para producción local



### Administracion (`/api/admin`)npm run build:prod          # Construir para producción optimizada

- `GET /dashboard` - Estadisticas

- `GET /users` - Lista de usuarios### 3. Solo Frontendnpm run build:ghpages       # Construir específicamente para GitHub Pages

- `GET /export/:format` - Exportar datos (csv/json)

```bashnpm run deploy:check        # Verificar que la construcción funciona


##  Componentes Frontend

### Paginas Principalesnpm run start:backendnpm run git:check # Verificar en qué rama estás

- **Home** - Pagina de inicio

- **Login** - Autenticacion de usuarios# API disponible en: http://localhost:3000npm run push:safe # Push seguro solo desde rama main

- **Encuestas** - Gestion de encuestas

- **Administrador** - Panel administrativo```git checkout main # Cambiar a rama main antes de hacer deploy

- **Directivo** - Panel directivo

````

### Servicios

- **EncuestasService** - Gestion de encuestas## 🛠 Scripts Disponibles

- **SecurityService** - Autenticacion y seguridad

- **ExportService** - Exportacion de datos### Vista Previa



##  Flujo de Desarrollo### Desarrollo```bash



1. **Desarrollo Local**- `npm start` - Ejecutar frontend + backendnpm run preview             # Servir la versión construida localmente

   ```bash

   npm run dev  # Ejecuta frontend + backend- `npm run dev` - Alias para start```

````


   ```

### Producción### Tecnologías Principales

3. **Deploy a Produccion**

   ```bash- `npm run start:frontend:prod` - Frontend en modo producción- **Angular 19**: Framework principal

   npm run deploy # Deploy con verificacion

   ```- `npm run start:backend:prod` - Backend en modo producción- **TypeScript**: Lenguaje de programación

##  Pantallas Disponibles- **RxJS**: Programación reactiva

-  **Inicio**: Pagina principal del sistema### Build y Deploy- **Angular Router**: Navegación entre páginas

-  **Encuestas**: Crear y gestionar encuestas

-  **Login**: Autenticacion de usuarios- `npm run build` - Build del frontend- **Angular Forms**: Gestión de formularios

-  **Admin**: Panel de administracion

-  **Directivo**: Panel directivo- `npm run build:ghpages` - Build para GitHub Pages


###  En Desarrollo

- [ ] Integracion frontend-backend- `npm run test:backend` - Tests solo Node.js- **EncuestasService**: Gestión completa de encuestas

- [ ] Sistema de autenticacion completo

- [ ] Base de datos persistente- **SecurityService**: Validación y seguridad

- [ ] Tests unitarios

- [ ] Validacion de formularios### Utilidades- **ExportService**: Exportación de datos

###  Proximas Mejoras- `npm run clean` - Limpiar node_modules y dist

- [ ] Docker containers

- [ ] CI/CD pipeline- `npm run git:check` - Verificar rama actual## 🚀 Deploy Automático

- [ ] Monitoring y logs

- [ ] PWA capabilities- `npm run push:safe` - Push seguro a main

- [ ] Internationalization

El proyecto se despliega automáticamente a GitHub Pages cuando:


## 📄 Licencia

- **Routing**: Angular Router### Deploy Manual

Proyecto bajo Licencia ISC.

- **Styling**: CSS3 + Angular Material (opcional)```bash

---

- **Build**: Angular CLInpm run deploy # Solo funciona desde rama main

> **Nota**: Sistema en desarrollo con datos simulados. Para uso en produccion configurar base de datos real.

- **Testing**: Jasmine + Karmanpm run deploy:force # Fuerza deploy sin verificación (usar con cuidado)



### Autenticación (`/api/auth`)El proyecto está configurado para mayor seguridad:

- `POST /api/auth/login` - Iniciar sesión- **Deploy protegido**: Solo desde rama `main`

- `POST /api/auth/register` - Registrar usuario- **Verificación automática**: Scripts que verifican la rama antes de deploy

- `POST /api/auth/logout` - Cerrar sesión- **Push seguro**: Comandos que previenen errores accidentales

- `GET /api/auth/validate` - Validar token

### Comandos de Seguridad

### Encuestas (`/api/encuestas`)```bash

- `GET /api/encuestas` - Listar encuestas activasnpm run git:check           # Ver rama actual

- `GET /api/encuestas/:id` - Obtener encuesta específicanpm run push:safe           # Push solo si estás en main

- `POST /api/encuestas` - Crear encuesta (auth requerida)npm run deploy              # Deploy con verificación de rama

- `PUT /api/encuestas/:id` - Actualizar encuesta (auth requerida)```

- `DELETE /api/encuestas/:id` - Eliminar encuesta (auth requerida)

- `POST /api/encuestas/:id/respuesta` - Enviar respuesta### Buenas Prácticas

1. Siempre trabajar en rama `main` para cambios de producción

### Administración (`/api/admin`)2. Usar `npm run git:check` para verificar la rama actual

- `GET /api/admin/dashboard` - Estadísticas3. Usar `npm run push:safe` en lugar de `git push` directo

- `GET /api/admin/users` - Lista de usuarios4. El deploy automático solo funciona desde `main`

- `GET /api/admin/export/:format` - Exportar datos (csv/json)

## 🎯 Características Principales


### Producción## Tecnologías

- **Sitio Web**: https://camilocastro118.github.io/encuestados/

- **Repositorio**: https://github.com/CamiloCastro118/encuestados- Angular 19.2.17


## 📋 Próximas Mejoras

### Backend
- [ ] Integración con base de datos (MongoDB/PostgreSQL)
- [ ] JWT para autenticación robusta
- [ ] Validación de datos con express-validator
- [ ] Tests unitarios completos
- [ ] Rate limiting implementado
- [ ] Documentación con Swagger

### Frontend
- [ ] Implementar todos los componentes
- [ ] Integracion con la API del backend
- [ ] Sistema de autenticación completo
- [ ] Diseño responsive mejorado
- [ ] Tests unitarios e2e

### General
- [ ] Docker containers
- [ ] CI/CD pipeline
- [ ] Monitoring y logging
- [ ] Documentación técnica extendida

## 👥 Contribucion

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto esta bajo la Licencia ISC. Ver el archivo LICENSE para más detalles.

```
