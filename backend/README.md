# Backend - API de Encuestas

Backend API desarrollado con Node.js y Express para la aplicacion de encuestas.

## 🛠 Tecnologias

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
  -- **CORS** - Habilitacion de peticiones cruzadas
- **Helmet** - Middlewares de seguridad
- **Morgan** - Logging de peticiones HTTP
  -- **Compression** - Compresion de respuestas

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── controllers/        # Logica de negocio
│   │   ├── authController.js
│   │   ├── encuestasController.js
│   │   └── adminController.js
│   ├── routes/            # Definicion de rutas
│   │   ├── auth.js
│   │   ├── encuestas.js
│   │   └── admin.js
│   ├── models/            # Modelos de datos (futuro)
│   ├── services/          # Servicios auxiliares (futuro)
│   ├── middleware/        # Middlewares personalizados (futuro)
│   └── server.js          # Punto de entrada
├── package.json
├── .env.example
└── README.md
```

## 🚀 Instalacion y Configuracion

### 1. Instalar dependencias

```bash
cd backend
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
# Editar .env con tu configuracion
```

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

### 4. Ejecutar en producción

```bash
npm start
```

## 📡 API Endpoints

### Rutas de Autenticacion (`/api/auth`)

-- `POST /api/auth/login` - Iniciar sesion
-- `POST /api/auth/register` - Registrar usuario
-- `POST /api/auth/logout` - Cerrar sesion

- `GET /api/auth/validate` - Validar token

### Rutas de Encuestas (`/api/encuestas`)

- `GET /api/encuestas` - Obtener todas las encuestas activas
- `GET /api/encuestas/:id` - Obtener encuesta por ID
- `POST /api/encuestas` - Crear nueva encuesta (requiere auth)
- `PUT /api/encuestas/:id` - Actualizar encuesta (requiere auth)
- `DELETE /api/encuestas/:id` - Eliminar encuesta (requiere auth)
- `POST /api/encuestas/:id/respuesta` - Enviar respuesta a encuesta

### Rutas Administrativas (`/api/admin`)

- `GET /api/admin/dashboard` - Estadisticas del dashboard
- `GET /api/admin/users` - Lista de usuarios
- `GET /api/admin/export/:format` - Exportar datos (csv/json)

### Rutas de Sistema

- `GET /` - Información de la API
- `GET /api/health` - Health check

## 🔧 Scripts Disponibles

```bash
npm start          # Ejecutar en producción
npm run dev        # Ejecutar en desarrollo con nodemon
npm test           # Ejecutar tests
npm run test:watch # Ejecutar tests en modo watch
npm run test:coverage # Ejecutar tests con coverage
```

## 📝 Ejemplos de Uso

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

### Obtener encuestas

```bash
curl http://localhost:3000/api/encuestas
```

### Crear encuesta

```bash
curl -X POST http://localhost:3000/api/encuestas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer tu_token_aqui" \
  -d '{
    "titulo": "Nueva Encuesta",
  "descripcion": "Descripcion de la encuesta",
    "preguntas": [
      {
        "id": 1,
  "texto": "¿Como calificarias el servicio?",
        "tipo": "escala",
        "opciones": ["1", "2", "3", "4", "5"]
      }
    ]
  }'
```

## 🔐 Seguridad

- **Helmet**: Configuración de headers de seguridad
- **CORS**: Control de acceso entre dominios
- **Rate Limiting**: Control de frecuencia de peticiones (configurado)
  -- **Validacion de entrada**: Validacion de datos de entrada
- **Variables de entorno**: Configuración sensible en archivos .env

- `http://localhost:4200` (Angular development server)

Para producción, actualizar la variable `FRONTEND_URL` en el archivo `.env`.

## 📊 Monitoring

- Health check disponible en: `GET /api/health`
- Logging de todas las peticiones HTTP con Morgan
- Variables de entorno para configuración de desarrollo/producción
