// controllers/usuario.controller.js
import Usuario from '../models/usuario.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const LLAVE_SECRETA = process.env.SECRET_KEY || 'clave_secreta_predeterminada';

// POST: Registrar un nuevo usuario y generar JWT que expira en 10 minutos
const registrar = async (req, res, next) => {
    try {
        const nuevoUsuario = await Usuario.create(req.body);
        
        // Generar JWT con el correo y el id, expiración en 10 minutos
        const tokenUsuario = jwt.sign(
            { id: nuevoUsuario._id, correo: nuevoUsuario.correo },
            LLAVE_SECRETA,
            { expiresIn: '10m' }
        );

        // Enviar el token en una cookie segura y respuesta JSON
        res.cookie('tokenUsuario', tokenUsuario, { httpOnly: true })
            .status(201)
            .json({ mensaje: 'Usuario creado correctamente', usuario: nuevoUsuario });
    } catch (error) {
        next(error);
    }
};

// POST: Iniciar sesión (Login)
const login = async (req, res, next) => {
    try {
        const { correo, contrasena } = req.body;

        // Validar que se proporcionaron los campos usando 'contrasena'
        if (!correo || !contrasena) {
            const error = new Error('El correo y la contraseña son obligatorios');
            error.statusCode = 400;
            throw error;
        }

        // Verificar si el correo pertenece a un usuario
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            const error = new Error('Correo no encontrado');
            error.statusCode = 400;
            throw error;
        }

        // Validar que la contraseña coincida comparando contra 'usuario.contrasena'
        const esClaveCorrecta = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!esClaveCorrecta) {
            const error = new Error('Contraseña incorrecta');
            error.statusCode = 400;
            throw error;
        }

        // Generar JWT con el correo y el id, expiración en 10 minutos
        const tokenUsuario = jwt.sign(
            { id: usuario._id, correo: usuario.correo },
            LLAVE_SECRETA,
            { expiresIn: '10m' }
        );

        // Enviar token en cookie y respuesta exitosa
        res.cookie('tokenUsuario', tokenUsuario, { httpOnly: true })
            .status(200)
            .json({ mensaje: 'Inicio de sesión exitoso' });
    } catch (error) {
        next(error);
    }
};

export { registrar, login };