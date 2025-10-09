import express from 'express';
import { login, register, logout, validateToken } from '../controllers/authController.js';

const router = express.Router();

// Rutas de autenticación
router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.get('/validate', validateToken);

export default router;