import { SmsApiSend, SmsdkApiCancel } from "@jamalsoueidan/bsb.api.sms-dk";
import { BookingModel, CustomerModel, NotificationModel, StaffModel } from "@jamalsoueidan/bsb.mongodb.models";
import { Booking, Notification, NotificationBody, NotificationQuery } from "@jamalsoueidan/bsb.mongodb.types";
import { subDays, subMinutes } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import mongoose from "mongoose";
import { beginningOfDay } from "./helpers/date";
import { NotificationTemplateServiceGet, NotificationTemplateServiceReplace } from "./notification-template.service";

interface SendProps {
  orderId: number;
  lineItemId?: number;
  receiver: string;
  message: string;
  template: string;
  scheduled?: Date;
  shop: string;
  isStaff: boolean;
}

const send = async ({ orderId, lineItemId, shop, receiver, message, template, scheduled, isStaff }: SendProps) => {
  // clear out all old schedules messages before sending new one.

  const notification = new NotificationModel({
    isStaff,
    lineItemId,
    message,
    orderId,
    receiver,
    scheduled,
    shop,
    template,
  });

  const response = await SmsApiSend({
    message,
    receiver,
    scheduled,
  });

  notification.status = scheduled ? "pending" : "success";
  notification.batchId = response.result.batchId;

  return notification.save();
};

interface NoMesageSendLastMinutesProps {
  shop: string;
  orderId: number;
  lineItemId: number;
  receiver: string;
}

const noMesageSendLastMinutes = async ({ shop, orderId, lineItemId, receiver }: NoMesageSendLastMinutesProps) => {
  const totalSend = await NotificationModel.find({
    lineItemId,
    orderId,
    receiver,
    shop,
    updatedAt: {
      $gte: subMinutes(new Date(), 15),
    },
  }).count();

  return totalSend === 0;
};

interface GetProps extends NotificationQuery {
  shop: string;
}

export const NotificationServiceGet = ({ shop, orderId, lineItemId }: GetProps) =>
  NotificationModel.find({
    lineItemId: { $in: [lineItemId, -1] },
    orderId,
    shop,
  }).sort({ createdAt: 1 });

interface SendCustomProps extends NotificationQuery, NotificationBody {
  shop: string;
}

export const NotificationServiceSendCustom = async (query: SendCustomProps) => {
  const { shop, orderId, lineItemId, message, to } = query;

  const messageSend = await noMesageSendLastMinutes({
    lineItemId,
    orderId,
    receiver: to.replace("+", ""),
    shop,
  });

  if (!messageSend) {
    throw new Error("after_fifteen_minutes_send_message");
  }

  // TODO: 15 minutes must pass between each message.
  const booking = await BookingModel.findOne({
    lineItemId,
    orderId,
    shop,
  }).lean();

  if (booking) {
    const receiver =
      to === "customer"
        ? await CustomerModel.findOne({
            customerId: booking.customerId,
          }).lean()
        : await StaffModel.findOne({
            staffId: booking.staff,
          }).lean();

    if (receiver) {
      return send({
        isStaff: to === "staff",
        lineItemId,
        message,
        orderId,
        receiver: receiver?.phone,
        shop,
        template: "cusom",
      });
    }
  }

  throw new Error("not_found");
};

interface ResendProps {
  shop: string;
  id: string;
}

export const NotificationServiceResend = async ({ shop, id }: ResendProps) => {
  const notification = await NotificationModel.findOne({
    _id: new mongoose.Types.ObjectId(id),
    shop,
  });

  if (notification) {
    const noMessage = await noMesageSendLastMinutes({
      lineItemId: notification.lineItemId,
      orderId: notification.orderId,
      receiver: notification.receiver.replace("+", ""),
      shop,
    });

    if (noMessage) {
      notification.updatedAt = new Date();
      await notification.save();

      /* const template = notification.template;
      const NotificationServiceTemplate =
        await notificationTemplateService.getNotificationTemplate({
          type: template,
          shop,
        });

      let message = notification.message;
      if (notificationTemplate) {
        const booking = bookingModel.findOne({booking})
        message = notificationTemplateService.replace(
          notificationTemplate,
          {

          }
        );
      } */

      return send(notification);
    }
  }

  throw new Error("after_fifteen_minutes_send_message");
};

interface SendBookingConfirmationCustomerProps {
  booking: Omit<Booking, "_id">;
  shop: string;
}

export const NotificationServiceSendBookingConfirmationCustomer = async ({
  booking,
  shop,
}: SendBookingConfirmationCustomerProps) => {
  const customer = await CustomerModel.findOne({
    customerId: booking.customerId,
  });
  if (!customer?.phone) {
    return;
  }

  const template = "BOOKING_CONFIRMATION";
  const notificationTemplate = await NotificationTemplateServiceGet({
    shop,
    type: template,
  });

  if (notificationTemplate) {
    const message = NotificationTemplateServiceReplace(notificationTemplate, {
      booking,
      receiver: customer,
    });

    send({
      isStaff: false,
      message,
      orderId: booking.orderId,
      receiver: customer.phone?.replace("+", ""),
      shop,
      template,
    });
  }
};

interface SendBookingUpdateCustomerProps {
  booking: Omit<Booking, "_id">;
  shop: string;
}

export const NotifcationServiceSendBookingUpdateCustomer = async ({
  booking,
  shop,
}: SendBookingUpdateCustomerProps) => {
  const customer = await CustomerModel.findOne({
    customerId: booking.customerId,
  });
  if (!customer?.phone) {
    return;
  }

  const template = "BOOKING_UPDATE";
  const notificationTemplate = await NotificationTemplateServiceGet({
    shop,
    type: template,
  });

  if (notificationTemplate) {
    const message = NotificationTemplateServiceReplace(notificationTemplate, {
      booking,
      receiver: customer,
    });

    send({
      isStaff: false,
      message,
      orderId: booking.orderId,
      receiver: customer.phone?.replace("+", ""),
      shop,
      template,
    });
  }
};

interface SendBookingReminderCustomerProps {
  bookings: Omit<Booking, "_id">[];
  shop: string;
}

export const NotificationServiceSendBookingReminderCustomer = async ({
  bookings,
  shop,
}: SendBookingReminderCustomerProps) => {
  const receiver = await CustomerModel.findOne({
    customerId: bookings[0].customerId,
  });
  if (!receiver?.phone) {
    return;
  }

  const template = "BOOKING_REMINDER_CUSTOMER";
  const notificationTemplate = await NotificationTemplateServiceGet({
    shop,
    type: template,
  });

  if (notificationTemplate) {
    bookings.forEach(async (booking) => {
      const message = NotificationTemplateServiceReplace(notificationTemplate, {
        booking,
        receiver,
      });

      await send({
        isStaff: false,
        lineItemId: booking.lineItemId,
        message,
        orderId: booking.orderId,
        receiver: receiver.phone?.replace("+", ""),
        scheduled: utcToZonedTime(subDays(booking.start, 1), notificationTemplate.timeZone),
        shop,
        template,
      });
    });
  }
};

interface SendBookingReminderStaffProps {
  bookings: Omit<Booking, "_id">[];
  shop: string;
}

export const NotificationServiceSendBookingReminderStaff = async ({
  bookings,
  shop,
}: SendBookingReminderStaffProps) => {
  const template = "BOOKING_REMINDER_STAFF";
  const notificationTemplate = await NotificationTemplateServiceGet({
    shop,
    type: template,
  });

  if (notificationTemplate) {
    bookings.forEach(async (booking) => {
      const receiver = await StaffModel.findById(booking.staff);
      if (receiver) {
        const message = NotificationTemplateServiceReplace(notificationTemplate, {
          booking,
          receiver,
        });

        await send({
          isStaff: true,
          lineItemId: booking.lineItemId,
          message,
          orderId: booking.orderId,
          receiver: receiver?.phone?.replace("+", "") || "",
          scheduled: utcToZonedTime(subDays(booking.start, 1), notificationTemplate.timeZone),
          shop,
          template,
        });
      }
    });
  }
};

interface CancelProps {
  id: string;
  shop: string;
}

export const NotificationServiceCancel = async ({ id: _id, shop }: CancelProps) => {
  const notification = await NotificationModel.findOneAndUpdate(
    {
      _id,
      shop,
    },
    {
      status: "cancelled",
    },
  );

  if (notification) {
    SmsdkApiCancel(notification?.batchId);
  }
  return notification;
};

interface CancelAllProps extends Pick<Notification, "orderId" | "lineItemId"> {
  shop: string;
}

export const NotificationServiceCancelAll = async ({ orderId, lineItemId, shop }: CancelAllProps) => {
  const notifications = await NotificationModel.find({
    lineItemId,
    orderId,
    scheduled: {
      $gte: beginningOfDay(new Date()),
    },
    shop,
    status: "pending",
  }).lean();

  notifications.forEach((notification) => {
    SmsdkApiCancel(notification.batchId);
  });

  NotificationModel.updateMany(
    {
      lineItemId,
      orderId,
      scheduled: {
        $gte: beginningOfDay(new Date()),
      },
      shop,
      status: "pending",
    },
    { status: "cancelled" },
  );
};
