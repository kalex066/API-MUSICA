import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio.'],
        trim: true
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio.'],
        trim: true
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio.'],
        unique: true,
        trim: true,
        lowercase: true
    },
    contrasena: {
        type: String,
        required: [true, 'La contraseña es obligatoria.'],
        minlength: [8, 'La contraseña debe tener al menos 8 caracteres.']
    }
}, { timestamps: true });

// Gancho (pre-save) corregido para usar 'contrasena'
UsuarioSchema.pre('save', async function (next) {
    if (this.isModified('contrasena')) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.contrasena = await bcrypt.hash(this.contrasena, salt);
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

export default model('Usuario', UsuarioSchema);

