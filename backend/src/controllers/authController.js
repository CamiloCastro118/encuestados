import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '2h';

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'Username, email y password son requeridos' });
    }

    const existing = await pool.query('SELECT id FROM users WHERE username = $1 OR email = $2', [username, email]);
    if (existing.rowCount > 0) {
      return res.status(409).json({ success: false, message: 'Usuario o email ya existe' });
    }

    const hash = await bcrypt.hash(password, 10);
    const insert = await pool.query(
      'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role',
      [username, email, hash, 'user']
    );

    const user = insert.rows[0];
    res.status(201).json({ success: true, message: 'Usuario registrado exitosamente', data: user });
  } catch (error) {
    console.error('register error', error);
    res.status(500).json({ success: false, message: 'Error en el registro', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ success: false, message: 'Username y password son requeridos' });

    const result = await pool.query('SELECT id, username, email, password, role FROM users WHERE username = $1', [username]);
    if (result.rowCount === 0) return res.status(401).json({ success: false, message: 'Credenciales inválidas' });

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ success: false, message: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.json({ success: true, message: 'Login exitoso', data: { token, user: { id: user.id, username: user.username, email: user.email, role: user.role } } });
  } catch (error) {
    console.error('login error', error);
    res.status(500).json({ success: false, message: 'Error en el login', error: error.message });
  }
};

export const logout = async (req, res) => {
  // JWT sin estado: el cierre de sesion se maneja en el cliente eliminando el token. Endpoint mantenido por compatibilidad.
  res.json({ success: true, message: 'Logout exitoso' });
};

export const validateToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ success: false, message: 'Token no proporcionado' });

    const token = authHeader.substring(7);
    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Token inválido' });
    }

    const result = await pool.query('SELECT id, username, email, role FROM users WHERE id = $1', [payload.id]);
    if (result.rowCount === 0) return res.status(401).json({ success: false, message: 'Usuario no encontrado' });

    const user = result.rows[0];
    res.json({ success: true, message: 'Token válido', data: { user } });
  } catch (error) {
    console.error('validateToken error', error);
    res.status(500).json({ success: false, message: 'Error en la validación del token', error: error.message });
  }
};