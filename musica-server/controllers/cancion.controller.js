import Cancion from '../models/cancion.model.js';

// POST: Agrega una nueva canción
const crearCancion = async (req, res, next) => {
    const cancion = new Cancion({
        titulo: req.body.titulo,
        artista: req.body.artista,
        anioLanzamiento: req.body.anioLanzamiento,
        genero: req.body.genero,
        album: req.body.album,
    });

    try {
        const cancionGuardada = await cancion.save();
        res.status(201).json(cancionGuardada);
    } catch (error) {
        next(error);
    }
};

// GET: Obtener todas las canciones
const obtenerTodasLasCanciones = async (req, res, next) => {
    try {
        const canciones = await Cancion.find();
        res.status(200).json(canciones);
    } catch (error) {
        next(error);
    }
};

// GET: Obtener una canción específica por su ID
const obtenerCancionPorId = async (req, res, next) => {
    try {
        const cancion = await Cancion.findById(req.params.id);
        if (!cancion) {
            const error = new Error('Lo siento, no se encontró la canción');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(cancion);
    } catch (error) {
        next(error);
    }
};

// PUT: Editar una canción existente
const actualizarCancion = async (req, res, next) => {
    const opciones = { new: true, runValidators: true };
    try {
        const cancionActualizada = await Cancion.findByIdAndUpdate(req.params.id, req.body, opciones);
        if (!cancionActualizada) {
            const error = new Error('Lo siento, no se encontró la canción');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(cancionActualizada);
    } catch (error) {
        next(error);
    }
};

// DELETE: Eliminar una canción
const eliminarCancion = async (req, res, next) => {
    try {
        const cancionEliminada = await Cancion.findByIdAndDelete(req.params.id);
        if (!cancionEliminada) {
            const error = new Error('Lo siento, no se encontró la canción');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ mensaje: 'La canción fue eliminada correctamente' });
    } catch (error) {
        next(error);
    }
};

export {
    crearCancion,
    obtenerTodasLasCanciones,
    obtenerCancionPorId,
    actualizarCancion,
    eliminarCancion
};








