import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const LLAVE_SECRETA = process.env.SECRET_KEY || 'clave_predeterminada';

const autenticarJWT = (req, res, next) => {
    try {
        // Buscar el token en las cookies utilizando la propiedad específica tokenUsuario
        const token = req.cookies?.tokenUsuario;

        if (!token) {
            return res.status(403).json({ mensaje: 'Acceso denegado: Token no proporcionado' });
        }

        // Verificar el token utilizando try...catch
        const usuarioDecodificado = jwt.verify(token, LLAVE_SECRETA);
        // Adjuntar la información del usuario al objeto request
        req.usuario = usuarioDecodificado;
        next();
    } catch (error) {
        return res.status(403).json({ mensaje: 'Acceso denegado: Token inválido o expirado' });
    }
};

export default autenticarJWT;

