import { BookingModel, ProductModel } from "@jamalsoueidan/bsb.mongodb.models";
import {
  BookingAggreate,
  BookingBodyCreate,
  BookingBodyUpdate,
  BookingQuery,
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

interface CreateProps extends BookingBodyCreate {
  shop: string;
}

export const BookingServiceCreate = async (body: CreateProps) => {
  const product = await ProductModel.findOne({
    productId: body.productId,
  }).lean();
  if (product) {
    const booking = await BookingModel.create({
      ...body,
      orderId: Date.now() + Math.floor(100000 + Math.random() * 900000),
      lineItemId: Date.now() + Math.floor(100000 + Math.random() * 900000),
      fulfillmentStatus: "booked",
      lineItemTotal: 1,
      title: product.title,
      isSelfBooked: true,
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

export const BookingServiceFind = async (shop) => {
  return await BookingModel.find({ shop });
};

interface GetBookingsByStaffProps extends Pick<BookingQuery, "start" | "end"> {
  shop: string;
  staff: Types.ObjectId[];
}

export const BookingServiceGetForWidget = ({
  shop,
  start,
  end,
  staff,
}: GetBookingsByStaffProps) => {
  return BookingModel.aggregate<BookingAggreate>([
    {
      $match: {
        shop,
        staff: {
          $in: staff,
        },
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
        shop: 0,
        productId: 0,
      },
    },
  ]);
};

interface GetBookingsProps extends BookingQuery {
  shop: string;
}

export const BookingServiceGetAll = ({
  shop,
  start,
  end,
  staff,
}: GetBookingsProps) => {
  return BookingModel.aggregate<BookingAggreate>([
    {
      $match: {
        shop,
        start: {
          $gte: beginningOfDay(start),
        },
        end: {
          $lt: closeOfDay(end),
        },
        ...(staff && { staff: new mongoose.Types.ObjectId(staff) }),
      },
    },
    ...lookupCustomerStaffProduct,
  ]);
};

interface UpdateProps {
  filter: { _id: string; shop: string };
  body: BookingBodyUpdate;
}

export const BookingServiceUpdate = async ({ filter, body }: UpdateProps) => {
  const {shop} = filter;
  const booking = await BookingModel.findOne(filter);
  if (!booking) {
    throw new Error("Not found");
  }
  booking.staff = body.staff;
  booking.start = new Date(body.start);
  booking.end = new Date(body.end);
  booking.isEdit = true;

  await NotificationServiceCancelAll({
    orderId: booking.orderId,
    lineItemId: booking.lineItemId,
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

  return await booking.save();
};

interface GetByIdProps {
  id: string;
  shop: string;
}

export const BookingServiceGetById = async ({
  shop,
  id,
}: GetByIdProps): Promise<BookingAggreate | null> => {
  const bookings = await BookingModel.aggregate([
    {
      $match: {
        shop,
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    ...lookupCustomerStaffProduct,
  ]);

  return bookings.length > 0 ? bookings[0] : null;
};

const lookupCustomerStaffProduct = [
  {
    $lookup: {
      from: "Customer",
      localField: "customerId",
      foreignField: "customerId",
      as: "customer",
    },
  },
  {
    $unwind: "$customer",
  },
  {
    $lookup: {
      from: "Staff",
      localField: "staff",
      foreignField: "_id",
      as: "staff",
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
      from: "Product",
      localField: "productId",
      foreignField: "productId",
      as: "product",
    },
  },
  {
    $unwind: {
      path: "$product",
      preserveNullAndEmptyArrays: true,
    },
  },
];
