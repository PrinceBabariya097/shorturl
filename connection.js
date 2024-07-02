import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv()

export const connectMongo = async () => {
return await mongoose.connect(process.env.MONGODB_URI)
}