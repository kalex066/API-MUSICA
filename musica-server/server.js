import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cancionRouter from './routes/cancion.router.js';
import rutasListas from './routes/listaCanciones.router.js';
import rutaNoEncontrada from './middlewares/rutaNoEncontrada.js';
import manejadorErrores from './middlewares/manejadorErrores.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares globales base
app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api', cancionRouter);
app.use('/api', rutasListas); 

// Middlewares de errores
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

