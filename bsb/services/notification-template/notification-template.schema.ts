import mongoose, { Document, Model } from "mongoose";

import { NotificationTemplate } from "@jamalsoueidan/bsb.types";

export interface INotificationTemplate extends Omit<NotificationTemplate, "_id"> {}

export interface INotificationTemplateDocument extends INotificationTemplate, Document {}

export interface INotificationTemplateModel extends Model<INotificationTemplateDocument> {}

export const NotificationTemplateSchema = new mongoose.Schema<
  INotificationTemplateDocument,
  INotificationTemplateModel
>({
  language: {
    default: "da",
    required: true,
    type: String,
  },
  message: String,
  name: {
    required: true,
    type: String,
  },
  senderName: String,
  shop: {
    index: true,
    required: true,
    type: String,
  },
});
