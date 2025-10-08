# Sistema de Encuestas - Encuestados

Una aplicación web moderna para la gestión y análisis de encuestas institucionales, desarrollada con Angular 19.

## 🚀 URLs del Proyecto

### Producción (GitHub Pages)
- **Sitio principal**: https://CamiloCastro118.github.io/encuestados/
- **Páginas disponibles**:
  - 🏠 Inicio: https://CamiloCastro118.github.io/encuestados/home
  - 📋 Encuestas: https://CamiloCastro118.github.io/encuestados/encuestas
  - 🔐 Login: https://CamiloCastro118.github.io/encuestados/login
  - 👨‍💼 Administrador: https://CamiloCastro118.github.io/encuestados/administrador
  - 👔 Directivo: https://CamiloCastro118.github.io/encuestados/directivo

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── components/           # Componentes de la aplicación
│   │   ├── home/            # Página de inicio
│   │   ├── login/           # Sistema de autenticación
│   │   ├── encuestas/       # Gestión de encuestas
│   │   ├── administrador/   # Panel administrativo
│   │   ├── directivo/       # Panel directivo
│   │   └── navbar/          # Barra de navegación
│   ├── services/            # Servicios de la aplicación
│   │   ├── encuestas.service.ts    # Gestión de encuestas
│   │   ├── security.service.ts     # Seguridad y validaciones
│   │   └── export.service.ts       # Exportación de datos
│   ├── app.routes.ts        # Configuración de rutas
│   └── app.config.ts        # Configuración principal
└── assets/                  # Recursos estáticos
```

## 🛠️ Comandos de Desarrollo

### Desarrollo Local
```bash
npm start                    # Servidor de desarrollo (http://localhost:4200)
npm run start:prod          # Servidor con configuración de producción
npm run watch               # Compilación automática en modo desarrollo
```

### Construcción y Deploy
```bash
npm run build               # Construir para producción local
npm run build:prod          # Construir para producción optimizada
npm run build:ghpages       # Construir específicamente para GitHub Pages
npm run deploy:check        # Verificar que la construcción funciona
npm run deploy              # Desplegar a GitHub Pages
```

### Vista Previa
```bash
npm run preview             # Servir la versión construida localmente
```

## 🔧 Configuración Técnica

### Tecnologías Principales
- **Angular 19**: Framework principal
- **TypeScript**: Lenguaje de programación
- **RxJS**: Programación reactiva
- **Angular Router**: Navegación entre páginas
- **Angular Forms**: Gestión de formularios

### Configuración de Rutas
- **Base URL GitHub Pages**: `/encuestados/`
- **Routing**: Client-side routing con fallback a `home`
- **Lazy Loading**: Componentes cargados bajo demanda

### Servicios
- **EncuestasService**: Gestión completa de encuestas
- **SecurityService**: Validación y seguridad
- **ExportService**: Exportación de datos

## 🚀 Deploy Automático

El proyecto se despliega automáticamente a GitHub Pages cuando:
1. Se hace push a la rama `main`
2. GitHub Actions ejecuta el workflow de construcción
3. Los archivos se publican en la rama `gh-pages`

### Deploy Manual
```bash
npm run deploy
```

## 🎯 Características Principales

- ✅ **Dashboard Interactivo**: Métricas y estadísticas en tiempo real
- ✅ **Gestión de Encuestas**: Crear, editar y administrar encuestas
- ✅ **Sistema de Roles**: Diferentes niveles de acceso (Usuario, Administrador, Directivo)
- ✅ **Seguridad Avanzada**: Validaciones y controles de sesión
- ✅ **Exportación de Datos**: Múltiples formatos de exportación
- ✅ **Responsive Design**: Adaptado para dispositivos móviles y desktop

## 📱 Navegación

La aplicación usa un sistema de navegación intuitivo:
- **Navbar**: Barra de navegación principal siempre visible
- **Rutas protegidas**: Acceso controlado según el rol del usuario
- **Breadcrumbs**: Indicadores de ubicación actual
- **Deep linking**: URLs directas para cada página

## 🔒 Seguridad

- Validación de sesiones
- Control de acceso basado en roles
- Cifrado de datos sensibles
- Auditoría de acciones del usuario

---

**Desarrollado con ❤️ para la gestión eficiente de encuestas institucionales**

## Tecnologías

- Angular 19.2.17
- TypeScript
- CSS responsivo
- Componentes standalone

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
ng serve
```

La aplicación estará disponible en `http://localhost:4200/`

## Construcción

Para generar el build de producción:

```bash
ng build
```
