import { Notification } from "@jamalsoueidan/bsb.types.notification";
import mongoose, { Document, Model } from "mongoose";

export interface INotification extends Omit<Notification, "_id"> {}

export interface INotificationDocument extends INotification, Document {}

export interface INotificationModel extends Model<INotificationDocument> {}

export const NotificationSchema = new mongoose.Schema<
  INotificationDocument,
  INotificationModel
>(
  {
    batchId: {
      index: true,
      type: String,
    },
    isStaff: {
      default: false,
      type: Boolean,
    },
    lineItemId: { default: -1, index: true, type: Number },
    message: String,
    orderId: { index: true, required: true, type: Number },
    receiver: String,
    scheduled: Date,
    shop: {
      index: true,
      required: true,
      type: String,
    },
    status: String,
    template: {
      default: "custom",
      index: true,
      type: String,
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } },
);

NotificationSchema.index({ createdAt: 1 });
