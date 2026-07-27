const manejadorErrores = (err, req, res, next) => {
    console.error(err.stack);

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            mensaje: 'Errores de validación',
            errores: extraerErrores(err),
        });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({ mensaje: 'El identificador proporcionado no es válido' });
    }

    // Error de correo duplicado
    if (err.code === 11000) {
        return res.status(400).json({ mensaje: 'Ya existe un usuario registrado con ese correo.' });
    }

    // Errores con statusCode explícito lanzados manualmente desde los controllers
    if (err.statusCode) {
        return res.status(err.statusCode).json({ mensaje: err.message });
    }

    // Cualquier otro error no controlado
    return res.status(500).json({ mensaje: err.message || 'Ha ocurrido un error inesperado' });
};

export default manejadorErrores;