import mongoose from "mongoose";
import {
  INotificationTemplateDocument,
  INotificationTemplateModel,
  NotificationTemplateSchema,
} from "./notification-template.schema";

export const NotificationTemplateModel = mongoose.model<INotificationTemplateDocument, INotificationTemplateModel>(
  "notificationtemplate",
  NotificationTemplateSchema,
  "NotificationTemplate",
);

NotificationTemplateModel.createCollection().then(async (collection) => {
  const count = await collection.countDocuments();
  if (count === 0) {
    const models = ["testeriphone.myshopify.com", "bysistersdk.myshopify.com"].map((shop) => [
      {
        language: "da",
        message: `Hej {fullname}, din behandlingstid er opdatere til d. {date}`,
        name: "BOOKING_UPDATE",
        shop,
      },
      {
        language: "da",
        message: `Hej {fullname}, Tak for din reservation, som indeholder {total} behandling(er)`,
        name: "BOOKING_CONFIRMATION",
        shop,
      },
      {
        language: "da",
        message: `Hej {fullname}, Husk din {title} behandling {time}, Vi ser frem til at se dig!`,
        name: "BOOKING_REMINDER_CUSTOMER",
        shop,
      },
      {
        language: "da",
        message: `Hej {fullname}, Husk du har en kunde som skal lave {title} behandling, {time}`,
        name: "BOOKING_REMINDER_STAFF",
        shop,
      },
      {
        language: "en",
        message: `Hey {fullname}, your booking time have changed to {date}`,
        name: "BOOKING_UPDATE",
        shop,
      },
      {
        language: "en",
        message: `hey {fullname}, thank you for your order, you have booked {total} treatments`,
        name: "BOOKING_CONFIRMATION",
        shop,
      },
      {
        language: "en",
        message: `hey {fullname}, remember your {title} treatment {time}, we look forward to see you!`,
        name: "BOOKING_REMINDER_CUSTOMER",
        shop,
      },
      {
        language: "en",
        message: `hey {fullname}, remember your customer needs to do {title} treatment, {time}`,
        name: "BOOKING_REMINDER_STAFF",
        shop,
      },
    ]);

    collection.insertMany(models.flat());
  }
});
