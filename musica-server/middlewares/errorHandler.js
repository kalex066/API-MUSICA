export const notFoundHandler = (req, res, next) => {
    const error = new Error('Ruta no encontrada');
    error.statusCode = 404;
    next(error);
};

export const globalErrorHandler = (err, req, res, next) => {
    const errorNormalizado = {
        codigoEstado: err.statusCode || 500,
        mensaje: err.message || 'Error interno del servidor',
        nombre: err.name || 'InternalServerError'
    };

    res.status(errorNormalizado.codigoEstado).json(errorNormalizado);
};