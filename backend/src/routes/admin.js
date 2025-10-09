import express from 'express';
import { 
  getDashboardStats, 
  getAllUsers, 
  exportData 
} from '../controllers/adminController.js';

const router = express.Router();

// Rutas administrativas (requieren rol de admin)
router.get('/dashboard', getDashboardStats);
router.get('/users', getAllUsers);
router.get('/export/:format', exportData);

export default router;