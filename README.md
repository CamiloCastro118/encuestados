# Sistema de Encuestas - Fullstack# Aplicación de Encuestas - Fullstack# Sistema de Encuestas - Encuestados

Sistema completo para gestion de encuestas con **Angular 19** (frontend) y **Node.js + Express** (backend).

## URLs del ProyectoAplicación fullstack para gestión de encuestas desarrollada con **Angular 19** (frontend) y **Node.js + Express** (backend).Una aplicacion web moderna para la gestión y análisis de encuestas institucionales, desarrollada con Angular 19.

- **Sitio Web**: https://camilocastro118.github.io/encuestados/

- **Repositorio**: https://github.com/CamiloCastro118/encuestados

- **API Backend**: http://localhost:3000 (desarrollo)## 🏗 Arquitectura del Proyecto## 🚀 URLs del Proyecto

- **Frontend**: http://localhost:4200 (desarrollo)

## Estructura del Proyecto

```### Produccion GitHub Pages

```

encuestas-app/encuestas-app/- **Sitio principal**: https://CamiloCastro118.github.io/encuestados/

├── frontend/ # Angular 19 - Interfaz de usuario

│ ├── src/app/├── 📁 frontend/ # Angular 19 - Cliente web- **Páginas disponibles**:

│ │ ├── components/ # Componentes de UI

│ │ └── services/ # Servicios Angular│ ├── src/ -  Inicio: https://CamiloCastro118.github.io/encuestados/home

│ └── package.json

├── backend/ # Node.js + Express - API REST│ │ ├── app/ -  Encuestas: https://CamiloCastro118.github.io/encuestados/encuestas

│ ├── src/

│ │ ├── controllers/ # Logica de negocio│ │ │ ├── components/ # Componentes de UI -  Login: https://CamiloCastro118.github.io/encuestados/login

│ │ ├── routes/ # Rutas de API

│ │ └── models/ # Modelos de datos│ │ │ └── services/ # Servicios Angular - 👨 Administrador: https://CamiloCastro118.github.io/encuestados/administrador

│ └── package.json

├── scripts/ # Scripts de utilidad│ │ └── ... -  Directivo: https://CamiloCastro118.github.io/encuestados/directivo

└── package.json # Configuracion principal

````│ ├── package.json



##  Inicio Rapido│   └── README.md##  Estructura del Proyecto



### Instalacion Completa├── 📁 backend/               # Node.js + Express - API REST

```bash

npm run install:all│   ├── src/```

````

│ │ ├── controllers/ # Lógica de negociosrc/

### Ejecutar Todo (Frontend + Backend)

````bash│ │   ├── routes/          # Rutas de API├── app/

npm start

# o│   │   ├── models/          # Modelos de datos│   ├── components/           # Componentes de la aplicacion

npm run dev

```│   │   └── services/        # Servicios backend│   │   ├── home/            # Pagina de inicio



### Solo Frontend│   ├── package.json│   │   ├── login/           # Sistema de autenticacion

```bash

npm run start:frontend│   └── README.md│   │   ├── encuestas/       # Gestión de encuestas

````

├── 📁 scripts/ # Scripts de utilidad│ │ ├── administrador/ # Panel administrativo

### Solo Backend

````bash├── package.json             # Configuración principal│   │   ├── directivo/       # Panel directivo

npm run start:backend

```└── README.md               # Este archivo│   │   └── navbar/          # Barra de navegacion



## 🛠 Comandos Principales```│   ├── services/            # Servicios de la aplicacion



| Comando | Descripcion |│   │   ├── encuestas.service.ts    # Gestion de encuestas

|---------|-------------|

| `npm start` | Ejecutar frontend + backend |## 🚀 Inicio Rapido│   │   ├── security.service.ts     # Seguridad y validaciones

| `npm run build` | Construir frontend |

| `npm run deploy` | Desplegar a GitHub Pages |│   │   └── export.service.ts       # Exportacion de datos

| `npm test` | Ejecutar tests |

| `npm run clean` | Limpiar dependencias |### 1. Instalacion Completa│   ├── app.routes.ts        # Configuración de rutas

| `npm run git:check` | Verificar rama actual |

```bash│   └── app.config.ts        # Configuración principal

## 🔧 Tecnologias

# Instalar dependencias de todo el proyecto└── assets/                  # Recursos estáticos

### Frontend

- **Angular 19** - Framework principalnpm run install:all```

- **TypeScript** - Lenguaje de programacion

- **Angular CLI** - Herramientas de desarrollo```

- **Standalone Components** - Arquitectura moderna

##  Comandos de Desarrollo

### Backend

- **Node.js 18+** - Runtime de JavaScript### 2. Desarrollo (Frontend + Backend)

- **Express.js** - Framework web

- **CORS** - Peticiones entre dominios```bash### Desarrollo Local

- **Helmet** - Seguridad HTTP

- **Morgan** - Logging de peticiones# Ejecutar ambos servidores simultáneamente```bash



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

### Sistema

- `GET /` - Info de la APInpm run start:frontendnpm run deploy              # Desplegar a GitHub Pages (solo desde rama main)

- `GET /api/health` - Estado del servidor

# Disponible en: http://localhost:4200npm run deploy:force        # Desplegar sin verificación de rama (uso avanzado)

##  Seguridad

````

- ✅ **Deploy protegido** - Solo desde rama `main`

- ✅ **Verificacion automatica** - Antes de cada deploy

- ✅ **CORS configurado** - Para desarrollo y produccion

- ✅ **Headers de seguridad** - Helmet implementado### 4. Solo Backend### Control de Versiones Seguro

##  Componentes Frontend`bash`bash

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

- `npm run start:frontend` - Solo Angular

2. **Verificar Cambios**

   ```bash- `npm run start:backend` - Solo Node.js/Express## 🔧 Configuración Técnica

   npm run git:check # Verificar rama

   npm test # Ejecutar tests

   ```

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

##  Estado Actual- `npm run deploy` - Deploy a GitHub Pages (con verificación)### Configuración de Rutas

### ✅ Completado- `npm run deploy:force` - Deploy forzado- **Base URL GitHub Pages**: `/encuestados/`

- [x] Estructura de proyecto separada (frontend/backend)

- [x] Backend API basico funcional- **Routing**: Client-side routing con fallback a `home`

- [x] Frontend Angular con componentes

- [x] Sistema de routing configurado### Testing- **Lazy Loading**: Componentes cargados bajo demanda

- [x] Scripts de desarrollo y deploy

- [x] Proteccion de deploy por rama- `npm test` - Tests de frontend + backend

- [x] Documentacion completa

- `npm run test:frontend` - Tests solo Angular### Servicios

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

##  Contribucion

## 🔧 Tecnologias1. Se hace push a la rama `main`

1. Fork el proyecto

2. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`2. GitHub Actions ejecuta el workflow de construcción

3. Commit cambios: `git commit -m 'Agregar nueva funcionalidad'`

4. Push a la rama: `git push origin feature/nueva-funcionalidad`### Frontend (Angular 19)3. Los archivos se publican en la rama `gh-pages`

5. Abrir Pull Request

- **Framework**: Angular 19 con Standalone Components

## 📄 Licencia

- **Routing**: Angular Router### Deploy Manual

Proyecto bajo Licencia ISC.

- **Styling**: CSS3 + Angular Material (opcional)```bash

---

- **Build**: Angular CLInpm run deploy # Solo funciona desde rama main

> **Nota**: Sistema en desarrollo con datos simulados. Para uso en produccion configurar base de datos real.

- **Testing**: Jasmine + Karmanpm run deploy:force # Fuerza deploy sin verificación (usar con cuidado)

````

### Backend (Node.js + Express)

- **Runtime**: Node.js 18+### Protección de Rama

- **Framework**: Express.js- ✅ **Solo rama main**: Los deploys automáticos solo se ejecutan desde `main`

- **Security**: Helmet, CORS- ✅ **Verificación previa**: El comando `deploy` verifica la rama actual

- **Logging**: Morgan- ✅ **Push seguro**: Usa `npm run push:safe` para push protegido

- **Development**: Nodemon- ✅ **Verificación de estado**: `npm run git:check` muestra la rama actual

- **Testing**: Jest + Supertest (configurado)

## 🔒 Seguridad del Desarrollo

## 🌐 Endpoints de la API

### Control de Ramas

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

### Sistema

- `GET /` - Información de la API- ✅ **Dashboard Interactivo**: Métricas y estadísticas en tiempo real

- `GET /api/health` - Health check- ✅ **Gestión de Encuestas**: Crear, editar y administrar encuestas

- ✅ **Sistema de Roles**: Diferentes niveles de acceso (Usuario, Administrador, Directivo)

## 🔐 Seguridad y Deploy- ✅ **Seguridad Avanzada**: Validaciones y controles de sesión

- ✅ **Exportación de Datos**: Múltiples formatos de exportación

### Protección de Rama- ✅ **Responsive Design**: Adaptado para dispositivos móviles y desktop

- ✅ **Deploy protegido**: Solo desde rama `main`

- ✅ **Verificación automática** antes de cada deploy## 📱 Navegación

- ✅ **Scripts seguros** para push y deploy

La aplicación usa un sistema de navegación intuitivo:

### Variables de Entorno- **Navbar**: Barra de navegación principal siempre visible

El backend utiliza variables de entorno configurables:- **Rutas protegidas**: Acceso controlado según el rol del usuario

```bash- **Breadcrumbs**: Indicadores de ubicación actual

# backend/.env- **Deep linking**: URLs directas para cada página

PORT=3000

FRONTEND_URL=http://localhost:4200## 🔒 Seguridad

NODE_ENV=development

```- Validación de sesiones

- Control de acceso basado en roles

## 📱 URLs del Proyecto- Cifrado de datos sensibles

- Auditoría de acciones del usuario

### Desarrollo

- **Frontend**: http://localhost:4200---

- **Backend API**: http://localhost:3000

- **Health Check**: http://localhost:3000/api/health**Desarrollado con ❤️ para la gestión eficiente de encuestas institucionales**



### Producción## Tecnologías

- **Sitio Web**: https://camilocastro118.github.io/encuestados/

- **Repositorio**: https://github.com/CamiloCastro118/encuestados- Angular 19.2.17

- TypeScript

## 🔄 Flujo de Desarrollo- CSS responsivo

- Componentes standalone

### 1. Desarrollo Local

```bash## Desarrollo

# Terminal 1: Backend

cd backendPara iniciar el servidor de desarrollo:

npm run dev

```bash

# Terminal 2: Frontendng serve

cd frontend```

npm start

La aplicación estará disponible en `http://localhost:4200/`

# O usar el script combinado:

npm run dev## Construcción

````

Para generar el build de producción:

### 2. Deploy a Producción

`bash`bash

# Verificar que estás en mainng build

npm run git:check```

# Deploy con verificación

npm run deploy

# Deploy forzado (solo emergencias)

npm run deploy:force

```

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
