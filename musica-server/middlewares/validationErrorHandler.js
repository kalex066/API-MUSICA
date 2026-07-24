import { extraerErroresDeValidacion } from '../util/validationUtils.js';

export const validarCancion = (req, res, next) => {
    const { titulo, artista, anioLanzamiento, genero, album } = req.body;
    const errores = [];

    if (!titulo || titulo.trim().length < 3) {
        errores.push({ campo: 'titulo', mensaje: 'El título debe tener al menos 3 caracteres' });
    }
    if (!artista || artista.trim().length < 3) {
        errores.push({ campo: 'artista', mensaje: 'El nombre del artista debe tener al menos 3 caracteres' });
    }
    if (!genero || genero.trim().length < 3) {
        errores.push({ campo: 'genero', mensaje: 'El género debe tener al menos 3 caracteres' });
    }
    if (anioLanzamiento === undefined || anioLanzamiento === null || String(anioLanzamiento).trim() === '') {
        errores.push({ campo: 'anioLanzamiento', mensaje: 'El año de lanzamiento es obligatorio' });
    } else if (Number.isNaN(Number(anioLanzamiento))) {
        errores.push({ campo: 'anioLanzamiento', mensaje: 'El año de lanzamiento debe ser un número válido' });
    }

    if (errores.length > 0) {
        const error = new AppError('Errores de validación en la canción', 400, 'VALIDATION_ERROR', errores);
        error.name = 'ValidationError';
        return next(error);
    }

    next();
};

export default validarCancion;



const validationErrorHandler = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        const errorNormalizado = {
        codigoEstado: 400,
        mensaje: err.message || 'Error de validación en los datos',
        nombre: 'ValidationError',
        erroresValidacion: extraerErroresDeValidacion(err)
        };
        return res.status(400).json(errorNormalizado);
    }
    next(err);
};

export default validationErrorHandler;