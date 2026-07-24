import { Router } from 'express';
import {
    crearLista,
    obtenerTodasLasListas,
    obtenerListaPorId,
    actualizarLista,
    eliminarLista,
} from '../controllers/listaCanciones.controller.js';

const router = Router();

router.post('/listas', crearLista);          // POST /api/listas
router.get('/listas', obtenerTodasLasListas);     // GET /api/listas
router.get('/listas/:id', obtenerListaPorId);     // GET /api/listas/:id
router.put('/listas/:id', actualizarLista);       // PUT /api/listas/:id
router.delete('/listas/:id', eliminarLista);      // DELETE /api/listas/:id

export default router;