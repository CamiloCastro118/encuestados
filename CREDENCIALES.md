
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

- Tokens de sesion almacenados en localStorage


### Protección de Rutas
- `/login` - Acceso libre
- `/home` - Solo usuarios autenticados
- `/encuestas` - Solo usuarios autenticados
- `/administrador` - Solo administradores
- `/directivo` - Solo directivos

### Interfaz de Usuario
- Navbar dinámico según rol de usuario
- Mensajes de error en login
- Estados de carga
- Redirección automática según permisos

##  URLs de Prueba

- **Login**: https://CamiloCastro118.github.io/encuestados/login
- **Aplicación**: https://CamiloCastro118.github.io/encuestados/
