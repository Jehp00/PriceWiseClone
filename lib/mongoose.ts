"use server"
//Conection DB
import mongoose from 'mongoose'

let statusConn = false;


export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URI) return console.log('MONGDB URI is not defined')

  if (statusConn) return console.log('[=> CONN] using exisiting database connection')

  try {
    await mongoose.connect(process.env.MONGODB_URI)
    statusConn = true;
    console.log("MongoDB connected")
  } catch (error) {
    console.log(error);
  }
}