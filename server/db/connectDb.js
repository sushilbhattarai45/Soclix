import mongoose from "mongoose";
import Express from "express";
const connectDb = async () => {
  try {
    const url = process.env.MONGO_URL;

    const conn = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDb;
