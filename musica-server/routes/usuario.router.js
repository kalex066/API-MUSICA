// routes/usuario.router.js
import { Router } from 'express';
import { registrar, login } from '../controllers/usuario.controller.js';

const router = Router();

// Ruta pública para registro -> POST http://localhost:8080/api/registro
router.post('/registro', registrar);

// Ruta pública para login -> POST http://localhost:8080/api/login
router.post('/login', login);

export default router;