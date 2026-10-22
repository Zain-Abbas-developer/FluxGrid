import mongoose from "mongoose";

declare const process: {
  env: Record<string, string | undefined>;
};

export async function connectDatabase() {
  const uri =
    process.env.MONGO_URI || "mongodb://localhost:27017/fluxgrid";

  await mongoose.connect(uri);

  console.log("Worker MongoDB connected");
}