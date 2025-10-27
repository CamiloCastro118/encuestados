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

// Rutas publicas responder encuestas
router.get('/', getAllEncuestas);
router.get('/:id', getEncuestaById);
router.post('/:id/respuesta', submitRespuesta);

// Rutas protegidas requieren autenticacion
router.post('/', createEncuesta);
router.put('/:id', updateEncuesta);
router.delete('/:id', deleteEncuesta);

export default router;