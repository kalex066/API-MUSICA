import mongoose from 'mongoose';

const listaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    canciones: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cancion',
        },
    ],
}, {
    timestamps: true    
});

const lista = mongoose.model('Lista', listaSchema);
export default lista;