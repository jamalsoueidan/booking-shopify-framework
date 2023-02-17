/* eslint-disable spaced-comment */
import { DateHelpers } from "@jamalsoueidan/bsb.helpers.date";
import {
  NotifcationServiceSendBookingUpdateCustomer,
  NotificationServiceCancelAll,
  NotificationServiceSendBookingConfirmationCustomer,
  NotificationServiceSendBookingReminderCustomer,
  NotificationServiceSendBookingReminderStaff,
} from "@jamalsoueidan/bsb.services.notification";
import { ProductModel } from "@jamalsoueidan/bsb.services.product";
import {
  BookingServiceCreateProps,
  BookingServiceFindProps,
  BookingServiceGetAllProps,
  BookingServiceGetAllReturn,
  BookingServiceGetByIdProps,
  BookingServiceGetByIdReturn,
  BookingServiceUpdateBodyProps,
  BookingServiceUpdateQueryProps,
  ShopQuery,
} from "@jamalsoueidan/bsb.types";
import mongoose from "mongoose";
import { BookingModel } from "./booking.model";

export const BookingServiceCreate = async (
  body: BookingServiceCreateProps & ShopQuery,
) => {
  const product = await ProductModel.findOne({
    productId: body.productId,
  }).lean();

  if (product) {
    const booking = await BookingModel.create({
      ...body,
      fulfillmentStatus: "booked",
      isSelfBooked: true,
      lineItemId: Date.now() + Math.floor(100000 + Math.random() * 900000),
      lineItemTotal: 1,
      orderId: Date.now() + Math.floor(100000 + Math.random() * 900000),
      title: product.title,
    });

    await NotificationServiceSendBookingConfirmationCustomer({
      booking,
      shop: body.shop,
    });

    await NotificationServiceSendBookingReminderStaff({
      bookings: [booking],
      shop: body.shop,
    });

    await NotificationServiceSendBookingReminderCustomer({
      bookings: [booking],
      shop: body.shop,
    });

    return booking;
  }
  throw new Error("no product found");
};

export const BookingServiceFind = async (shop: BookingServiceFindProps) =>
  BookingModel.find({ shop });

export const BookingServiceGetAll = ({
  shop,
  start,
  end,
  staff,
}: BookingServiceGetAllProps & ShopQuery) =>
  BookingModel.aggregate<BookingServiceGetAllReturn>([
    {
      $match: {
        end: {
          $lt: DateHelpers.closeOfDay(end),
        },
        shop,
        start: {
          $gte: DateHelpers.beginningOfDay(start),
        },
        ...(Array.isArray(staff) && {
          staff: { $in: staff.map((s) => new mongoose.Types.ObjectId(s)) },
        }),
        ...(staff &&
          !Array.isArray(staff) && {
            staff: new mongoose.Types.ObjectId(staff),
          }),
      },
    },
    ...lookup,
  ]);

export const BookingServiceUpdate = async (
  query: BookingServiceUpdateQueryProps & ShopQuery,
  body: BookingServiceUpdateBodyProps,
) => {
  const booking = await BookingModel.findOne(query);
  if (!booking) {
    throw new Error("Not found");
  }
  booking.staff = new mongoose.Types.ObjectId(body.staff);
  booking.start = new Date(body.start);
  booking.end = new Date(body.end);
  booking.isEdit = true;

  const { shop } = query;

  await NotificationServiceCancelAll({
    lineItemId: booking.lineItemId,
    orderId: booking.orderId,
    shop,
  });

  await NotifcationServiceSendBookingUpdateCustomer({
    booking,
    shop,
  });

  await NotificationServiceSendBookingReminderStaff({
    bookings: [booking],
    shop,
  });

  await NotificationServiceSendBookingReminderCustomer({
    bookings: [booking],
    shop,
  });

  return booking.save();
};

export const BookingServiceGetById = async ({
  shop,
  _id,
  staff,
}: BookingServiceGetByIdProps & ShopQuery) => {
  const bookings = await BookingModel.aggregate<BookingServiceGetByIdReturn>([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(_id),
        shop,
        ...(Array.isArray(staff) && {
          staff: { $in: staff.map((s) => new mongoose.Types.ObjectId(s)) },
        }),
        ...(typeof staff === "string" && {
          staff: new mongoose.Types.ObjectId(staff),
        }),
      },
    },
    ...lookup,
  ]);

  return bookings.length > 0 ? bookings[0] : null;
};

/* Can't be added to BookingSchema.pre("aggregate", function (next) {
  Because Widget also use BookingModel.aggreate, and don't need relation
  */
const lookup = [
  {
    $lookup: {
      as: "customer",
      foreignField: "customerId",
      from: "Customer",
      localField: "customerId",
    },
  },
  {
    $unwind: {
      path: "$customer",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $lookup: {
      as: "staff",
      foreignField: "_id",
      from: "Staff",
      localField: "staff",
    },
  },
  {
    $unwind: {
      path: "$staff",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $lookup: {
      as: "product",
      foreignField: "productId",
      from: "Product",
      localField: "productId",
    },
  },
  {
    $unwind: {
      path: "$product",
      preserveNullAndEmptyArrays: true,
    },
  },
];
