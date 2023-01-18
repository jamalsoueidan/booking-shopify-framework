import mongoose, { Document } from "mongoose";
import { Setting } from "@jamalsoueidan/bsb.mongodb.types";

export interface ISettingModel extends Omit<Setting, "_id">, Document {}

export const SettingSchema = new mongoose.Schema({
  shop: {
    type: String,
    required: true,
    index: true,
  },
  timeZone: {
    type: String,
    default: "Europe/Copenhagen",
  },
  language: {
    type: String,
    default: "da-DK",
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const SettingModel = mongoose.model<ISettingModel>(
  "setting",
  SettingSchema,
  "Setting"
);

SettingModel.createCollection().then(async (collection) => {
  const count = await collection.countDocuments();
  if (count === 0) {
    collection.insertMany([
      {
        shop: "testeriphone.myshopify.com",
        timeZone: "Europe/Copenhagen",
        language: "da-DK",
        status: true,
      },
      {
        shop: "bysistersdk.myshopify.com",
        timeZone: "Europe/Copenhagen",
        language: "da-DK",
        status: true,
      },
    ]);
  }
});

export { SettingModel };
