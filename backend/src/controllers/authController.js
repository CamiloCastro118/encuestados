// Controlador para autenticación

// Datos de ejemplo (temporales)
let users = [
  {
    id: 1,
    username: "admin",
    email: "admin@encuestas.com",
    password: "admin123", // En produccion esto debe estar hasheado
    role: "admin",
    fechaCreacion: new Date().toISOString()
  },
  {
    id: 2,
    username: "usuario",
    email: "usuario@encuestas.com",
    password: "user123",
    role: "user",
    fechaCreacion: new Date().toISOString()
  }
];

let sessions = [];

export const login = (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Validaciones básicas
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username y password son requeridos'
      });
    }

    // Buscar usuario
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Crear sesión simple
    const sessionToken = `token_${Date.now()}_${user.id}`;
    const session = {
      token: sessionToken,
      userId: user.id,
      username: user.username,
      role: user.role,
      fechaLogin: new Date().toISOString()
    };

    sessions.push(session);

    res.json({
      success: true,
      message: 'Login exitoso',
      data: {
        token: sessionToken,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el login',
      error: error.message
    });
  }
};

export const register = (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Validaciones básicas
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username, email y password son requeridos'
      });
    }

    // Verificar si el usuario ya existe
    const existingUser = users.find(u => u.username === username || u.email === email);
    
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Usuario o email ya existe'
      });
    }

    // Crear nuevo usuario
    const newUser = {
      id: users.length + 1,
      username,
      email,
      password, // En producción esto debe estar hasheado
      role: "user",
      fechaCreacion: new Date().toISOString()
    };

    users.push(newUser);

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el registro',
      error: error.message
    });
  }
};

export const logout = (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token es requerido'
      });
    }

    // Remover sesión
    const sessionIndex = sessions.findIndex(s => s.token === token);
    
    if (sessionIndex !== -1) {
      sessions.splice(sessionIndex, 1);
    }

    res.json({
      success: true,
      message: 'Logout exitoso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el logout',
      error: error.message
    });
  }
};

export const validateToken = (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Token no proporcionado'
      });
    }

    const token = authHeader.substring(7);
    const session = sessions.find(s => s.token === token);
    
    if (!session) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido'
      });
    }

    const user = users.find(u => u.id === session.userId);
    
    res.json({
      success: true,
      message: 'Token válido',
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en la validación del token',
      error: error.message
    });
  }
};