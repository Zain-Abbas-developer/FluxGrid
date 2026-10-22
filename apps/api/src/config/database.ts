import mongoose from "mongoose";

export async function connectDatabase() {
  const uri =
    process.env.MONGO_URI || "mongodb://localhost:27017/fluxgrid";

  await mongoose.connect(uri);

  console.log("MongoDB connected");
}