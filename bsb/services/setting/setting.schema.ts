import { Setting } from "@jamalsoueidan/bsb.types.setting";
import mongoose, { Document, Model } from "mongoose";

export interface ISetting extends Omit<Setting, "_id"> {}

export interface ISettingDocument extends ISetting, Document {}

export interface ISettingModel extends Model<ISettingDocument> {}

export const SettingSchema = new mongoose.Schema<
  ISettingDocument,
  ISettingModel
>({
  language: {
    default: "da",
    type: String,
  },
  shop: {
    index: true,
    required: true,
    type: String,
  },
  status: {
    default: true,
    type: Boolean,
  },
  timeZone: {
    default: "Europe/Copenhagen",
    type: String,
  },
});
