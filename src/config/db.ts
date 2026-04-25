import mongoose from 'mongoose';
import 'dotenv/config';

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || '';
    if (!uri) throw new Error('MONGODB_URI no está definido en el .env');

    await mongoose.connect(uri);
    console.log('MongoDB conectado exitosamente (MS3)');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;