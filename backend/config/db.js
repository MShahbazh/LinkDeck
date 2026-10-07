import mongoose from "mongoose";
import { MONGODB_URI } from "../index.js";

export async function connectToMongoDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Database Connected");
    return mongoose;
  } catch (error) {
    console.log("Database Not Connected: ",error);
    return null;
  }
}
