import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const globalMongoose = globalThis;

globalMongoose.mongooseCache ??= {
  conn: null,
  promise: null,
};

const connectDB = async () => {
  console.log(`[${new Date().toISOString()}] [db.js] Attempting to connect to MongoDB...`);
  const cache = globalMongoose.mongooseCache;

  if (cache.conn) {
    console.log(`[${new Date().toISOString()}] [db.js] Using cached MongoDB connection`);
    return cache.conn;
  }

  if (!cache.promise) {
    console.log(`[${new Date().toISOString()}] [db.js] Creating new MongoDB connection`);
    cache.promise = mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    });
  }

  try {
    cache.conn = await cache.promise;
    console.log(`[${new Date().toISOString()}] [db.js] Connected to MongoDB`);
    return cache.conn;
  } catch (err) {
    console.error(`[${new Date().toISOString()}] [db.js] Error connecting to MongoDB:`, err);
    cache.promise = null;
    process.exit(1);
  }
};

export default connectDB;
