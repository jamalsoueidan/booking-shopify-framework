import { subDays, subMinutes } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import mongoose from "mongoose";
import {
  BookingModel,
  CustomerModel,
  NotificationModel,
  StaffModel,
} from "@jamalsoueidan/bsb.mongodb.models";
import {
  Booking,
  Notification,
  NotificationBody,
  NotificationQuery,
} from "@jamalsoueidan/bsb.mongodb.types";
import { SmsApiSend, SmsdkApiCancel } from "@jamalsoueidan/bsb.api.sms-dk";
import {
  NotificationTemplateServiceGet,
  NotificationTemplateServiceReplace,
} from "./notification-template.service";
import { beginningOfDay } from "./helpers/date";

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

const send = async ({
  orderId,
  lineItemId,
  shop,
  receiver,
  message,
  template,
  scheduled,
  isStaff,
}: SendProps) => {
  // clear out all old schedules messages before sending new one.

  const notification = new NotificationModel({
    orderId,
    lineItemId,
    message,
    template,
    receiver,
    scheduled,
    shop,
    isStaff,
  });

  const response = await SmsApiSend({
    receiver,
    message,
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

const noMesageSendLastMinutes = async ({
  shop,
  orderId,
  lineItemId,
  receiver,
}: NoMesageSendLastMinutesProps) => {
  const totalSend = await NotificationModel.find({
    shop,
    orderId,
    lineItemId,
    receiver,
    updatedAt: {
      $gte: subMinutes(new Date(), 15),
    },
  }).count();

  return totalSend === 0;
};

interface GetProps extends NotificationQuery {
  shop: string;
}

export const NotificationServiceGet = ({
  shop,
  orderId,
  lineItemId,
}: GetProps) => {
  return NotificationModel.find({
    shop,
    orderId,
    lineItemId: { $in: [lineItemId, -1] },
  }).sort({ createdAt: 1 });
};

interface SendCustomProps extends NotificationQuery, NotificationBody {
  shop: string;
}

export const NotificationServiceSendCustom = async (query: SendCustomProps) => {
  const { shop, orderId, lineItemId, message, to } = query;

  const messageSend = await noMesageSendLastMinutes({
    shop,
    orderId,
    lineItemId,
    receiver: to.replace("+", ""),
  });

  if (!messageSend) {
    throw new Error("after_fifteen_minutes_send_message");
  }

  // TODO: 15 minutes must pass between each message.
  const booking = await BookingModel.findOne({
    shop,
    orderId,
    lineItemId,
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
        shop,
        orderId,
        lineItemId,
        message,
        template: "cusom",
        receiver: receiver?.phone,
        isStaff: to === "staff",
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
    shop,
    _id: new mongoose.Types.ObjectId(id),
  });

  if (notification) {
    const noMessage = await noMesageSendLastMinutes({
      shop,
      orderId: notification.orderId,
      lineItemId: notification.lineItemId,
      receiver: notification.receiver.replace("+", ""),
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
    type: template,
    shop,
  });

  if (notificationTemplate) {
    const message = NotificationTemplateServiceReplace(notificationTemplate, {
      booking,
      receiver: customer,
    });

    return send({
      orderId: booking.orderId,
      shop,
      receiver: customer.phone?.replace("+", ""),
      message,
      template,
      isStaff: false,
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
    type: template,
    shop,
  });

  if (notificationTemplate) {
    const message = NotificationTemplateServiceReplace(notificationTemplate, {
      booking,
      receiver: customer,
    });

    return send({
      orderId: booking.orderId,
      shop,
      receiver: customer.phone?.replace("+", ""),
      message,
      template,
      isStaff: false,
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
    type: template,
    shop,
  });

  if (notificationTemplate) {
    for (const booking of bookings) {
      const message = NotificationTemplateServiceReplace(notificationTemplate, {
        booking,
        receiver,
      });

      await send({
        shop,
        orderId: booking.orderId,
        lineItemId: booking.lineItemId,
        receiver: receiver.phone?.replace("+", ""),
        message,
        template,
        scheduled: utcToZonedTime(
          subDays(booking.start, 1),
          notificationTemplate.timeZone
        ),
        isStaff: false,
      });
    }
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
    type: template,
    shop,
  });

  if (notificationTemplate) {
    for (const booking of bookings) {
      const receiver = await StaffModel.findById(booking.staff);
      if (receiver) {
        const message = NotificationTemplateServiceReplace(
          notificationTemplate,
          {
            booking,
            receiver,
          }
        );

        await send({
          shop,
          orderId: booking.orderId,
          lineItemId: booking.lineItemId,
          receiver: receiver?.phone?.replace("+", "") || "",
          scheduled: utcToZonedTime(
            subDays(booking.start, 1),
            notificationTemplate.timeZone
          ),
          message,
          template,
          isStaff: true,
        });
      }
    }
  }
};

interface CancelProps {
  id: string;
  shop: string;
}

export const NotificationServiceCancel = async ({
  id: _id,
  shop,
}: CancelProps) => {
  const notification = await NotificationModel.findOneAndUpdate(
    {
      _id,
      shop,
    },
    {
      status: "cancelled",
    }
  );

  if (notification) {
    SmsdkApiCancel(notification?.batchId);
  }
  return notification;
};

interface CancelAllProps extends Pick<Notification, "orderId" | "lineItemId"> {
  shop: string;
}

export const NotificationServiceCancelAll = async ({
  orderId,
  lineItemId,
  shop,
}: CancelAllProps) => {
  const notifications = await NotificationModel.find({
    orderId,
    lineItemId,
    shop,
    status: "pending",
    scheduled: {
      $gte: beginningOfDay(new Date()),
    },
  }).lean();

  for (const notification of notifications) {
    SmsdkApiCancel(notification.batchId);
  }

  NotificationModel.updateMany(
    {
      orderId,
      lineItemId,
      shop,
      status: "pending",
      scheduled: {
        $gte: beginningOfDay(new Date()),
      },
    },
    { status: "cancelled" }
  );
};
