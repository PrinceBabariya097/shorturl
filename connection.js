import mongoose from "mongoose";

export const connectMongo = async () => {
return await mongoose.connect('mongodb://localhost:27017/shorturl')
}