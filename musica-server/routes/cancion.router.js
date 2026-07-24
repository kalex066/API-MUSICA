import { Router } from 'express';
import {
    crearCancion,
    obtenerTodasLasCanciones,
    obtenerCancionPorId,
    actualizarCancion,
    eliminarCancion
} from '../controllers/cancion.controller.js';

const router = Router();

router.post('/canciones', crearCancion);          // POST /api/canciones
router.get('/canciones', obtenerTodasLasCanciones);     // GET /api/canciones
router.get('/canciones/:id', obtenerCancionPorId);     // GET /api/canciones/:id
router.put('/canciones/:id', actualizarCancion);       // PUT /api/canciones/:id
router.delete('/canciones/:id', eliminarCancion);      // DELETE /api/canciones/:id

export default router;