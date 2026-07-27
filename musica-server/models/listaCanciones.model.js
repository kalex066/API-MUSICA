import mongoose from 'mongoose';

const listaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: [3, 'Playlist name must be at least 3 characters long'],
        maxlength: [100, 'El nombre no puede exceder los 100 caracteres'],
    },
    canciones: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cancion' }],
      // Validador para solicitar que al menos una canción sea seleccionada
        validate: {
        validator: (valor) => Array.isArray(valor) && valor.length > 0,
        message: 'At least one song must be selected',
        },
    },
}, {timestamps: true});

const lista = mongoose.model('Lista', listaSchema);
export default lista;
