import Lista from '../models/listaCanciones.model.js';

// Crear una nueva playlist
const crearLista = async (req, res, next) => {
    const { nombre, canciones } = req.body;
    
    const nuevaLista = new Lista({
        nombre,
        canciones
    });

    try {
        const listaGuardada = await nuevaLista.save();
        res.status(201).json(listaGuardada);
    } catch (error) {
        next(error);
    }
};

// Obtener todas las playlists (con populate)
const obtenerTodasLasListas = async (req, res, next) => {
    try {
        const listas = await Lista.find().populate('canciones');
        res.status(200).json(listas);
    } catch (error) {
        next(error);
    }
};

// Obtener una playlist por id (con populate)
const obtenerListaPorId = async (req, res, next) => {
    const { id } = req.params;

    try {
        const lista = await Lista.findById(id).populate('canciones');
        if (!lista) {
            const error = new Error('Lo siento, no se encontró la lista de reproducción');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(lista);
    } catch (error) {
        next(error);
    }
};

// Actualizar playlist
const actualizarLista = async (req, res, next) => {
    const { id } = req.params;
    const { nombre, canciones } = req.body;
    const opciones = { new: true, runValidators: true };

    try {
        const listaActualizada = await Lista.findByIdAndUpdate(
            id,
            { nombre, canciones },
            opciones
        ).populate('canciones');

        if (!listaActualizada) {
            const error = new Error('Lo siento, no se encontró la lista de reproducción');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(listaActualizada);
    } catch (error) {
        next(error);
    }
};

// Eliminar playlist
const eliminarLista = async (req, res, next) => {
    const { id } = req.params;

    try {
        const listaEliminada = await Lista.findByIdAndDelete(id);
        if (!listaEliminada) {
            const error = new Error('Lo siento, no se encontró la lista de reproducción');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ mensaje: 'La lista de reproducción fue eliminada correctamente' });
    } catch (error) {
        next(error);
    }
};

export {
    crearLista,
    obtenerTodasLasListas,
    obtenerListaPorId,
    actualizarLista,
    eliminarLista,
};
