import mongoose from "mongoose";

export const connect = async (callback) => {
  try {
    if (!process.env.MONGODB_URI) {
      throw Error("Please set MONGODB_URI env variable, export mongodb_uri");
    }
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGODB_URI, callback);
    console.log("Connecting to MongoDB Atlas cluster...");
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
  }
};
