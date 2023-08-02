import mongoose from 'mongoose';
import config from './config.js';
const connectDB = async () => {
  try {
    // Creamos la conexión a mongo utilizando la URI
    await mongoose
        .connect(config.mongoURI)
        .then(() => console.log("Conectado a MONGO DB"))
        .catch((error) => console.error(error));
    
  } catch (error) {
    console.error(`Error al conectar con MongoDB: ${error.message}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    process.exit(1);
  }
};

export default connectDB;
