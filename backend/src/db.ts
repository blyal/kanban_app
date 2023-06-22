import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('MONGODB_URI is not defined in the .env file');
}

export const connectDb = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected successfully to MongoDB');
  } catch (err) {
    console.log(`Failed to connect to MongoDB: ${err}`);
    throw err;
  }
};

export const closeDb = async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (err) {
    console.log(`Failed to close the MongoDB connection: ${err}`);
    throw err;
  }
};
