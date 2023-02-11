import { DateHelpers } from "@jamalsoueidan/bsb.helpers.date";
import { BookingModel, IBooking } from "@jamalsoueidan/bsb.services.booking";
import { CartModel } from "@jamalsoueidan/bsb.services.cart";
import { IProduct, ProductModel } from "@jamalsoueidan/bsb.services.product";
import { ScheduleModel } from "@jamalsoueidan/bsb.services.schedule";
import {
  Cart,
  ShopQuery,
  WidgetServiceAvailabilityProps,
  WidgetServiceGetBookingsReturn,
  WidgetServiceGetSchedulesProps,
  WidgetServiceGetSchedulesReturn,
  WidgetStaff,
} from "@jamalsoueidan/bsb.types";
import { Types } from "mongoose";
import {
  WidgetCreateAvailability,
  WidgetRemoveAvailability,
  WidgetServiceGetProduct,
} from "./widget.helper";

// get all staff from product for widget
export const WidgetServiceGetStaff = ({ shop, productId }: Partial<IProduct>) =>
  ProductModel.aggregate<WidgetStaff>([
    {
      $match: {
        active: true,
        productId,
        shop,
      },
    },
    {
      $unwind: { path: "$staff" },
    },
    {
      $lookup: {
        as: "staff.staff",
        foreignField: "_id",
        from: "Staff",
        localField: "staff.staff",
      },
    },
    {
      $unwind: {
        path: "$staff.staff",
      },
    },
    {
      $addFields: {
        "staff.staff._id": "$staff._id",
        "staff.staff.staff": "$staff.staff._id",
        "staff.staff.tag": "$staff.tag",
      },
    },
    {
      $addFields: {
        "_id.staff": "$staff.staff",
      },
    },
    {
      $replaceRoot: {
        newRoot: "$_id",
      },
    },
    {
      $replaceRoot: {
        newRoot: "$staff",
      },
    },
    { $match: { active: true } },
    {
      $project: {
        __v: 0,
        active: 0,
        email: 0,
        phone: 0,
        shop: 0,
      },
    },
  ]);

export const WidgetServiceAvailability = async ({
  staff,
  start,
  end,
  shop,
  productId,
}: WidgetServiceAvailabilityProps & ShopQuery) => {
  const product = await WidgetServiceGetProduct({
    productId,
    shop,
    staff,
  });

  if (product) {
    const schedules = await WidgetServiceGetSchedules({
      shop,
      end,
      staff: product.staff.map((s) => s.staff),
      start,
      tag: product.staff.map((s) => s.tag),
    });

    const bookings = await WidgetServiceGetBookings({
      end,
      shop,
      staff: product.staff.map((s) => s.staff),
      start,
    });

    const carts = await WidgetServiceGetCarts({
      end,
      shop,
      staff: product.staff.map((s) => s.staff),
      start,
    });

    const createdAvailabilities = WidgetCreateAvailability(product, schedules);

    let availabilities = createdAvailabilities;
    bookings.forEach((book) => {
      availabilities = createdAvailabilities.map(
        WidgetRemoveAvailability({
          end: book.end,
          staff: book.staff,
          start: book.start,
        }),
      );
    });

    carts.forEach((cart) => {
      availabilities = createdAvailabilities.map(
        WidgetRemoveAvailability({
          end: cart.end,
          start: cart.start,
          staff: cart.staff,
        }),
      );
    });

    return availabilities;
  }
  return [];
};

interface GetBookingsByStaffProps extends Pick<IBooking, "start" | "end"> {
  shop: string;
  staff: Types.ObjectId[];
}

export const WidgetServiceGetBookings = ({
  shop,
  start,
  end,
  staff,
}: GetBookingsByStaffProps) =>
  BookingModel.aggregate<WidgetServiceGetBookingsReturn>([
    {
      $match: {
        $or: [
          {
            start: {
              $gte: DateHelpers.beginningOfDay(start),
            },
          },
          {
            end: {
              $gte: DateHelpers.beginningOfDay(start),
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
              $lt: DateHelpers.closeOfDay(end),
            },
          },
          {
            end: {
              $lt: DateHelpers.closeOfDay(end),
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

const WidgetServiceGetSchedules = ({
  tag,
  staff,
  start,
  end,
  shop,
}: WidgetServiceGetSchedulesProps & ShopQuery) =>
  ScheduleModel.aggregate<WidgetServiceGetSchedulesReturn>([
    {
      $match: {
        end: {
          $lt: DateHelpers.closeOfDay(end),
        },
        shop,
        staff: {
          $in: staff,
        },
        start: {
          $gte: DateHelpers.beginningOfDay(start),
        },
        tag: {
          $in: tag,
        },
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
      },
    },
    {
      $match: {
        "staff.active": true,
      },
    },
    {
      $project: {
        "staff.__v": 0,
        "staff.active": 0,
        "staff.avatar": 0,
        "staff.email": 0,
        "staff.phone": 0,
        "staff.position": 0,
        "staff.shop": 0,
      },
    },
  ]);

interface GetCartsByStaffierProps extends Omit<Cart, "createdAt" | "staff"> {
  staff: Types.ObjectId[];
}

const WidgetServiceGetCarts = ({
  shop,
  staff,
  start,
  end,
}: GetCartsByStaffierProps) =>
  CartModel.aggregate<Cart>([
    {
      $match: {
        $or: [
          {
            start: {
              $gte: start,
            },
          },
          {
            end: {
              $gte: start,
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
              $lt: end,
            },
          },
          {
            end: {
              $lt: end,
            },
          },
        ],
      },
    },
  ]);
