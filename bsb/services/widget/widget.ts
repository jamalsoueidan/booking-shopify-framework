import { DateHelpers } from "@jamalsoueidan/bsb.helpers.date";
import { BookingModel, IBooking } from "@jamalsoueidan/bsb.services.booking";
import { CartServiceGetByStaff } from "@jamalsoueidan/bsb.services.cart";
import {
  IProduct,
  IProductDocument,
  ProductModel,
} from "@jamalsoueidan/bsb.services.product";
import { ScheduleServiceGetByStaffAndTag } from "@jamalsoueidan/bsb.services.schedule";
import {
  Cart,
  ScheduleGetByStaffAndTag,
  ShopQuery,
  WidgetDateQuery,
  WidgetServiceGetBookingsReturn,
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

interface AvailabilityQuery extends Omit<WidgetDateQuery, "staff">, ShopQuery {
  staff?: string;
}

export const WidgetServiceAvailability = async ({
  staff,
  start,
  end,
  shop,
  productId,
}: AvailabilityQuery) => {
  const product = await WidgetServiceGetProduct({
    productId,
    shop,
    staff,
  });

  if (product) {
    const schedules = await ScheduleServiceGetByStaffAndTag({
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

    const carts = await CartServiceGetByStaff({
      end,
      shop,
      staff: product.staff.map((s) => s.staff),
      start,
    });

    return WidgetServiceCalculator({ bookings, carts, product, schedules });
  }
  return [];
};

interface WidgetServiceCalculatorProps {
  schedules: Array<ScheduleGetByStaffAndTag>;
  bookings: Array<WidgetServiceGetBookingsReturn>;
  carts: Array<Cart>;
  product: IProduct | IProductDocument;
}

export const WidgetServiceCalculator = ({
  schedules,
  bookings,
  carts,
  product,
}: WidgetServiceCalculatorProps) => {
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
