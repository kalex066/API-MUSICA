const extraerErrores = (error) => {
    const errores = {};
    Object.keys(error.errors).forEach((campo) => {
        errores[campo] = error.errors[campo].message;
    });
    return errores;
};

const manejadorErrores = (err, req, res, next) => {
  // Log en el servidor para depuración (nunca se envía al cliente)
    console.error(`[${err.name}] ${err.message}`);

  // Errores de validación de Mongoose (required, minlength, maxlength, validadores personalizados)
    if (err.name === 'ValidationError') {
        return res.status(400).json({
        mensaje: 'Errores de validación',
        errores: extraerErrores(err),
        });
    }

    // ID con formato inválido 
    if (err.name === 'CastError') {
        return res.status(400).json({ mensaje: 'El identificador proporcionado no es válido' });
    }

    //Cualquier otro error
    return res.status(500).json({ mensaje: err.message || 'Ha ocurrido un error inesperado' });
};

export default manejadorErrores;