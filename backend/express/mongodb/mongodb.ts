import mongoose, { CallbackWithoutResult } from "mongoose";

export const connect = (callback?: CallbackWithoutResult) => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error(
        "Please set MONGODB_URI env variable, export mongodb_uri",
      );
    }
    mongoose.set("strictQuery", false);
    if (callback) {
      mongoose.connect(process.env.MONGODB_URI, callback);
    } else {
      mongoose.connect(process.env.MONGODB_URI);
    }
    // eslint-disable-next-line no-console
    console.log("Connecting to MongoDB Atlas cluster...");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Connection to MongoDB Atlas failed!", error);
  }
};
