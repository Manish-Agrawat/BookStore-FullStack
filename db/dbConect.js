import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from.env file

dotenv.config();
// Connect to MongoDB
async function dbConect() {
  try {
    await mongoose.connect(process.env.DBURL);
    console.log("Databasse Connected sucessfully");
  } catch (error) {
    console.log(error);
  }
}

export default dbConect;
