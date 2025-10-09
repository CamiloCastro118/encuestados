import express from 'express';
import { 
  getAllEncuestas, 
  getEncuestaById, 
  createEncuesta, 
  updateEncuesta, 
  deleteEncuesta,
  submitRespuesta 
} from '../controllers/encuestasController.js';

const router = express.Router();

// Rutas públicas (para responder encuestas)
router.get('/', getAllEncuestas);
router.get('/:id', getEncuestaById);
router.post('/:id/respuesta', submitRespuesta);

// Rutas protegidas (requieren autenticación)
router.post('/', createEncuesta);
router.put('/:id', updateEncuesta);
router.delete('/:id', deleteEncuesta);

export default router;