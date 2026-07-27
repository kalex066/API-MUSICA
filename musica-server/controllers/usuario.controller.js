import Usuario from '../models/usuario.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const LLAVE_SECRETA = process.env.SECRET_KEY || 'clave_predeterminada';

// POST: Registrar un nuevo usuario
const registrar = async (req, res, next) => {
    try {
        const { nombre, apellido, correo, contrasena } = req.body;

        // Validar que todos los campos han sido proporcionados
        if (!nombre || !apellido || !correo || !contrasena) {
            const error = new Error('Todos los campos son obligatorios: nombre, apellido, correo y contraseña');
            error.statusCode = 400;
            throw error;
        }

        const nuevoUsuario = await Usuario.create({ nombre, apellido, correo, contrasena });

        // Generar JWT con el correo y el id, expiración en 10 minutos
        const tokenUsuario = jwt.sign(
            { id: nuevoUsuario._id, correo: nuevoUsuario.correo },
            LLAVE_SECRETA,
            { expiresIn: '10m' }
        );

        // Enviar el token en cookie y respuesta JSON
        res.cookie('tokenUsuario', tokenUsuario, { httpOnly: true })
            .status(201)
            .json({
                mensaje: 'Usuario creado correctamente',
                usuario: nuevoUsuario,
                token: tokenUsuario
            });
    } catch (error) {
        next(error);
    }
};

// POST: Iniciar sesión (Login)
const login = async (req, res, next) => {
    try {
        const { correo, contrasena } = req.body;

        // Validar que se proporcionaron los campos
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

        // Validar que la contraseña coincida con la encriptada
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
            .json({
                mensaje: 'Inicio de sesión exitoso',
                token: tokenUsuario
            });
    } catch (error) {
        next(error);
    }
};

export { registrar, login };