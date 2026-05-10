const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  const dbName = process.env.MONGO_DB_NAME;

  if (!uri) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }

  const connection = await mongoose.connect(uri, { dbName });
  console.log(`MongoDB connected: ${connection.connection.host}/${connection.connection.name}`);
};

module.exports = connectDB;
