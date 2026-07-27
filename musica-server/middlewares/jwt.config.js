import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const LLAVE_SECRETA = process.env.SECRET_KEY || 'clave_predeterminada';

const autenticarJWT = (req, res, next) => {
    try {
        // Buscar el token en el header 'token_usuario' o en la cookie 'token_usuario'
        const token = req.headers['token_usuario'] || req.cookies?.token_usuario || req.cookies?.tokenUsuario;

        if (!token) {
            return res.status(403).json({ mensaje: 'Acceso denegado: Token no proporcionado' });
        }

        const usuarioDecodificado = jwt.verify(token, LLAVE_SECRETA);
        req.usuario = usuarioDecodificado;
        next();
    } catch (error) {
        return res.status(403).json({ mensaje: 'Acceso denegado: Token inválido o expirado' });
    }
};

export default autenticarJWT;

