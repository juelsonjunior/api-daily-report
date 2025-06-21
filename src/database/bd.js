import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function conectBD() {
  await mongoose.connect(`${process.env.DB_HOST}`);
}

export default conectBD();
