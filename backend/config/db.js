import mongoose from "mongoose";
import VARS from "./vars.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(VARS.MONGO_URI);
    console.log("mongoDB connected: " + conn.connection.host);
  } catch (error) {
    console.log("error in connecting mongo: " + error.message);
    process.exit(1);
  }
};
