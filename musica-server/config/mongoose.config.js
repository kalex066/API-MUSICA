import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
console.log("VALOR DE LA URI:", process.env.MONGODB_URI);
const URI_MONGODB = process.env.MONGODB_URI;

async function dbConnect() {
    try {
        await mongoose.connect(URI_MONGODB, {
        dbName: 'musicaDB',
        });
        console.log("Conexión exitosa a MongoDB");
    } catch (error) {
        console.error("Error al conectar a MongoDB", error);
        throw error;
    }
}

export default dbConnect;