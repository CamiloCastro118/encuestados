#Credenciales de Prueba - Sistema de Encuestas

## Usua## 🧪 Flujo de Prueba Recomendado

1. **Acceder al login** con cualquiera de las credenciales
2. **Verificar redirección** automática según el rol
3. **Probar navegación** por las páginas permitidas
4. **Intentar acceder** a páginas no autorizadas
5. **🚪 USAR BOTONES DE CERRAR SESIÓN** para cambiar usuario:
   - Botón rojo "Salir" en la barra de navegación
   - Botón flotante rojo en la esquina superior derecha
6. **Cambiar entre usuarios** diferentes para probar roles

## 🚪 Botones de Cerrar Sesión

### ✅ Disponibles en todas las páginas autenticadas:
- **Navbar**: Botón rojo "Salir" en la barra superior
- **Flotante**: Botón rojo en esquina superior derecha
- **Menú**: Opción en menú desplegable del usuario

### 🔄 Para cambiar de usuario:
1. Hacer clic en cualquier botón de "Salir"
2. Serás redirigido automáticamente al login
3. Ingresa con diferentes credenciales para probar otros roles Prueba

### Administrador
- **Usuario**: `admin`
- **Contraseña**: `admin123`
- **Acceso**: Panel de administración completo

### Directivo
- **Usuario**: `directivo`
- **Contraseña**: `dir123`
- **Acceso**: Panel directivo y encuestas

###  Usuario Normal
- **Usuario**: `user`
- **Contraseña**: `user123`
- **Acceso**: Solo encuestas

##  Protocolos de Seguridad Implementados

### Autenticación
- Sistema de login con validación de credenciales
- Tokens de sesión almacenados en localStorage
- Restauración automática de sesión

###  Autorización (Guards)
- **AuthGuard**: Protege rutas que requieren autenticación
- **AdminGuard**: Protege rutas exclusivas de administradores
- **DirectivoGuard**: Protege rutas exclusivas de directivos

### Protección de Rutas
- `/login` - Acceso libre
- `/home` - Solo usuarios autenticados
- `/encuestas` - Solo usuarios autenticados
- `/administrador` - Solo administradores
- `/directivo` - Solo directivos

###  Gestión de Sesiones
- Control de sesiones activas
- Detección de expiración
- Logout automático y manual
- Persistencia de sesión entre recargas

### Interfaz de Usuario
- Navbar dinámico según rol de usuario
- Mensajes de error en login
- Estados de carga
- Redirección automática según permisos

##  URLs de Prueba

- **Login**: https://CamiloCastro118.github.io/encuestados/login
- **Aplicación**: https://CamiloCastro118.github.io/encuestados/

## Flujo de Prueba Recomendado

1. **Acceder al login** con cualquiera de las credenciales
2. **Verificar redirección** automática según el rol
3. **Probar navegación** por las páginas permitidas
4. **Intentar acceder** a páginas no autorizadas
5. **Cerrar sesión** y verificar protección

##  Características Adicionales

-  Validación de formularios
-  Manejo de errores
-  Estados de carga
-  Responsivo (móvil y escritorio)
-  Persistencia de "Recordar usuario"