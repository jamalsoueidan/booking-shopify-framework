import mongoose, { Model } from "mongoose";
import { INotificationDocument, INotificationModel, NotificationSchema } from "./notification.schema";

// eslint-disable-next-line @typescript-eslint/ban-types
export const NotificationModel: Model<INotificationDocument, {}, {}, {}, INotificationModel> =
  mongoose.models.notification ||
  mongoose.model<INotificationDocument, INotificationModel>("notification", NotificationSchema, "Notification");
