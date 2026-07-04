const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[DB Connection] Remote MONGO_URI connection failed: ${error.message}`);
    
    const fallbackUri = process.env.MONGO_URI_LOCAL;
    if (!fallbackUri) {
      console.error('Database connection error: Remote MONGO_URI failed and MONGO_URI_LOCAL is not defined in env.');
      process.exit(1);
    }

    console.warn(`[DB Connection] Attempting fallback to local MongoDB...`);
    try {
      const conn = await mongoose.connect(fallbackUri);
      console.log(`MongoDB Connected (Local Fallback): ${conn.connection.host}`);
    } catch (fallbackError) {
      console.error(`Database connection error (local fallback also failed): ${fallbackError.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
