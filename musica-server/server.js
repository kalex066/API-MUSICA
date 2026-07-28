import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import cancionRouter from './routes/cancion.router.js';
import rutasListas from './routes/listaCanciones.router.js';
import usuarioRouter from './routes/usuario.router.js';
import autenticarJWT from './middlewares/jwt.config.js';
import rutaNoEncontrada from './middlewares/rutaNoEncontrada.js';
import manejadorErrores from './middlewares/manejadorErrores.js';

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares globales base
app.use(cors({
    origin: ['http://localhost:5173', 'https://api-musica-iota.vercel.app'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Rutas públicas de autenticación (Login y Registro)
app.use('/api', usuarioRouter);

// Rutas protegidas: Se aplica middleware autenticarJWT para exigir token en canciones y listas
app.use('/api', autenticarJWT, cancionRouter);
app.use('/api', autenticarJWT, rutasListas);

//Errores
app.use(rutaNoEncontrada);
app.use(manejadorErrores);

// Conexión a MongoDB con Mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/musica')
    .then(() => {
        console.log('Conexión exitosa a la base de datos MongoDB Atlas');
    })
    .catch((error) => {
        console.error('Error al conectar a MongoDB:', error);
    });

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

