import mongoose from "mongoose";
import { ISettingDocument, ISettingModel, SettingSchema } from "./setting.schema";

export const SettingModel = mongoose.model<ISettingDocument, ISettingModel>("setting", SettingSchema, "Setting");

SettingModel.createCollection().then(async (collection) => {
  const count = await collection.countDocuments();
  if (count === 0) {
    collection.insertMany([
      {
        language: "da",
        shop: "testeriphone.myshopify.com",
        status: true,
        timeZone: "Europe/Copenhagen",
      },
      {
        language: "da",
        shop: "bysistersdk.myshopify.com",
        status: true,
        timeZone: "Europe/Copenhagen",
      },
    ]);
  }
});
