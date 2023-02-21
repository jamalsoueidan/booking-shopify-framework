import { DateHelpers } from "@jamalsoueidan/bsb.helpers.date";
import { BookingModel, IBooking } from "@jamalsoueidan/bsb.services.booking";
import { CartModel } from "@jamalsoueidan/bsb.services.cart";
import { ProductModel } from "@jamalsoueidan/bsb.services.product";
import { ScheduleModel } from "@jamalsoueidan/bsb.services.schedule";
import { ShopQuery } from "@jamalsoueidan/bsb.types.api";
import { BaseBooking } from "@jamalsoueidan/bsb.types.booking";
import { Cart } from "@jamalsoueidan/bsb.types.cart";
import {
  WidgetServiceAvailabilityProps,
  WidgetServiceGetSchedulesProps,
  WidgetServiceGetSchedulesReturn,
  WidgetServiceGetStaffProps,
  WidgetServiceGetStaffReturn,
} from "@jamalsoueidan/bsb.types.widget";
import mongoose, { PipelineStage, Types } from "mongoose";
import {
  WidgetCreateAvailability,
  WidgetRemoveAvailability,
  WidgetServiceGetProduct,
} from "./widget.helper";

// get all staff from product for widget
export const WidgetServiceGetStaff = ({
  shop,
  productId,
  staff,
}: WidgetServiceGetStaffProps & { staff?: string } & ShopQuery) => {
  let pipeline: PipelineStage[] = [
    {
      $match: {
        active: true,
        productId,
        shop,
      },
    },
    {
      $unwind: "$staff",
    },
  ];

  if (staff) {
    pipeline.push({
      $match: {
        "staff.staff": new mongoose.Types.ObjectId(staff),
      },
    });
  }

  pipeline = [
    ...pipeline,
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
  ];

  return ProductModel.aggregate<WidgetServiceGetStaffReturn>(pipeline);
};

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
    const staff = product.staff.map((s) => s.staff);
    const tag = product.staff.map((s) => s.tag);

    const schedules = await WidgetServiceGetSchedules({
      end,
      shop,
      staff,
      start,
      tag,
    });

    let createdAvailabilities = WidgetCreateAvailability(product, schedules);

    const bookings = await WidgetServiceGetBookings({
      end,
      shop,
      staff,
      start,
    });

    createdAvailabilities = WidgetRemoveAvailability(
      createdAvailabilities,
      bookings,
    );

    const carts = await WidgetServiceGetCarts({
      end,
      shop,
      staff,
      start,
    });

    createdAvailabilities = WidgetRemoveAvailability(
      createdAvailabilities,
      carts,
    );

    return createdAvailabilities;
  }
  return [];
};

export interface GetBookingsByStaffProps
  extends Pick<IBooking, "start" | "end"> {
  shop: string;
  staff: Types.ObjectId[];
}

export const WidgetServiceGetBookings = ({
  shop,
  start,
  end,
  staff,
}: GetBookingsByStaffProps) =>
  BookingModel.aggregate<BaseBooking>([
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

export const WidgetServiceGetSchedules = ({
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

export interface GetCartsByStaffierProps
  extends Omit<Cart, "createdAt" | "staff"> {
  staff: Types.ObjectId[];
}

export const WidgetServiceGetCarts = ({
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
