import { model, Schema } from 'mongoose';

const CancionSchema = new Schema({
    titulo: {
        type: String,
        required: [true, 'El título de la canción es obligatorio.'],
        minlength: [3, 'El título debe tener al menos 3 caracteres.'],// se ajusta el maximo y minimo para ser mas real
        maxlength: [50, 'El título no puede exceder los 50 caracteres.']
    },
    artista: {
        type: String,
        required: [true, 'El nombre del artista es obligatorio.'],
        minlength: [3, 'El nombre del artista debe tener al menos 3 caracteres.'],// se ajusta el maximo y el minimo para ser mas real
        maxlength: [50, 'El nombre del artista no puede exceder los 50 caracteres.']
    },
    anioLanzamiento: {
        type: Number,
        required: [true, 'El año de lanzamiento es obligatorio.'],
        min: [1000, 'El año de lanzamiento debe tener 4 dígitos.'],
        max: [9999, 'El año de lanzamiento debe tener 4 dígitos.']
    },
    genero: {
        type: String,
        required: [true, 'El género musical es obligatorio.']
    },
    album: {
        type: String,
        required: [true, 'El nombre del album es obligatorio'],
    }
}, { timestamps: true }); 

const Cancion = model('Cancion', CancionSchema);

export default Cancion;