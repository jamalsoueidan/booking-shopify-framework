import mongoose from "mongoose";
import { INotificationDocument, INotificationModel, NotificationSchema } from "./notification.schema";

export const NotificationModel = mongoose.model<INotificationDocument, INotificationModel>(
  "notification",
  NotificationSchema,
  "Notification",
);
