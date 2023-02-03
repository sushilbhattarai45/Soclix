import mongoose from "mongoose";
import Express from "express";
const connectDb = async () => {
  try {
    let url =
      "mongodb+srv://soclix123:soclix123@cluster0.vl9wvgl.mongodb.net/?retryWrites=true&w=majority";
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
