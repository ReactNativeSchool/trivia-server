import mongoose from "mongoose";

export const connectMongo = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return mongoose.connect(process.env.DB_CONNECTION);
};
