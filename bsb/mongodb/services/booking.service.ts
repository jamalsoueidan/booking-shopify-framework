import { BookingModel, ProductModel } from "@jamalsoueidan/bsb.mongodb.models";
import {
  BookingBodyCreateRequest,
  BookingBodyUpdateRequest,
  BookingQuery,
  BookingResponse,
} from "@jamalsoueidan/bsb.mongodb.types";
import mongoose, { Types } from "mongoose";
import { beginningOfDay, closeOfDay } from "./helpers/date";
import {
  NotifcationServiceSendBookingUpdateCustomer,
  NotificationServiceCancelAll,
  NotificationServiceSendBookingConfirmationCustomer,
  NotificationServiceSendBookingReminderCustomer,
  NotificationServiceSendBookingReminderStaff,
} from "./notification.service";

interface CreateProps extends BookingBodyCreateRequest {
  shop: string;
}

export const BookingServiceCreate = async (body: CreateProps) => {
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

export const BookingServiceFind = async (shop) => BookingModel.find({ shop });

interface GetBookingsByStaffProps extends Pick<BookingQuery, "start" | "end"> {
  shop: string;
  staff: Types.ObjectId[];
}

export const BookingServiceGetForWidget = ({ shop, start, end, staff }: GetBookingsByStaffProps) =>
  BookingModel.aggregate<BookingResponse>([
    {
      $match: {
        $or: [
          {
            start: {
              $gte: beginningOfDay(start),
            },
          },
          {
            end: {
              $gte: beginningOfDay(start),
            },
          },
        ],
        shop,
        staff: {
          $in: staff,
        },
      },
    },
    {
      $match: {
        $or: [
          {
            start: {
              $lt: closeOfDay(end),
            },
          },
          {
            end: {
              $lt: closeOfDay(end),
            },
          },
        ],
      },
    },
    {
      $project: {
        _id: 0,
        productId: 0,
        shop: 0,
      },
    },
  ]);

interface GetBookingsProps extends BookingQuery {
  shop: string;
}

export const BookingServiceGetAll = ({ shop, start, end, staff }: GetBookingsProps) =>
  BookingModel.aggregate<BookingResponse>([
    {
      $match: {
        end: {
          $lt: closeOfDay(end),
        },
        shop,
        start: {
          $gte: beginningOfDay(start),
        },
        ...(staff && { staff: new mongoose.Types.ObjectId(staff) }),
      },
    },
    ...lookupCustomerStaffProduct,
  ]);

interface UpdateProps {
  filter: { _id: string; shop: string };
  body: BookingBodyUpdateRequest;
}

export const BookingServiceUpdate = async ({ filter, body }: UpdateProps) => {
  const { shop } = filter;
  const booking = await BookingModel.findOne(filter);
  if (!booking) {
    throw new Error("Not found");
  }
  booking.staff = body.staff;
  booking.start = new Date(body.start);
  booking.end = new Date(body.end);
  booking.isEdit = true;

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

interface GetByIdProps {
  id: string;
  shop: string;
}

export const BookingServiceGetById = async ({ shop, id }: GetByIdProps): Promise<BookingResponse | null> => {
  const bookings = await BookingModel.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
        shop,
      },
    },
    ...lookupCustomerStaffProduct,
  ]);

  return bookings.length > 0 ? bookings[0] : null;
};

const lookupCustomerStaffProduct = [
  {
    $lookup: {
      as: "customer",
      foreignField: "customerId",
      from: "Customer",
      localField: "customerId",
    },
  },
  {
    $unwind: "$customer",
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
