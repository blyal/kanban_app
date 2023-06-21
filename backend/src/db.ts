import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('MONGODB_URI is not defined in the .env file');
}

const client = new MongoClient(uri);

export const connectDb = async () => {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
    return client;
  } catch (err) {
    console.log(`Failed to connect to MongoDB: ${err}`);
    throw err;
  }
};

export const closeDb = async () => {
  try {
    await client.close();
    console.log('MongoDB connection closed');
  } catch (err) {
    console.log(`Failed to close the MongoDB connection: ${err}`);
    throw err;
  }
};
