import { DateHelpers } from "@jamalsoueidan/bsb.helpers.date";
import { BookingModel, IBooking } from "@jamalsoueidan/bsb.services.booking";
import { CartServiceGetByStaff, ICart } from "@jamalsoueidan/bsb.services.cart";
import {
  IProduct,
  IProductDocument,
  ProductModel,
} from "@jamalsoueidan/bsb.services.product";
import { ScheduleServiceGetByStaffAndTag } from "@jamalsoueidan/bsb.services.schedule";
import {
  ScheduleGetByStaffAndTag,
  ShopQuery,
  WidgetDateQuery,
  WidgetSchedule,
  WidgetStaff,
} from "@jamalsoueidan/bsb.types";
import {
  addMinutes,
  isBefore,
  isSameDay,
  isWithinInterval,
  subMinutes,
} from "date-fns";
import mongoose, { Aggregate, Types } from "mongoose";

interface WidgetSericeGetProductProps {
  shop: string;
  productId: number;
  staff?: string;
}

export const WidgetServiceGetProduct = async ({
  shop,
  productId,
  staff,
}: WidgetSericeGetProductProps) => {
  if (!staff) {
    return ProductModel.findOne({
      active: true,
      productId,
      shop,
    });
  }

  const products = await ProductModel.aggregate<IProduct>([
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
    {
      $match: {
        "staff.staff": new mongoose.Types.ObjectId(staff),
      },
    },
  ]);

  if (products.length > 0) {
    const product = products[0];
    return product;
  }
  return null;
};

// get all staff from product for widget
export const WidgetServiceGetStaff = ({
  shop,
  productId,
}: Partial<IProduct>): Aggregate<Array<WidgetStaff>> =>
  ProductModel.aggregate([
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
    productId: +productId,
    shop,
    staff,
  });

  if (product) {
    const schedules = await ScheduleServiceGetByStaffAndTag({
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

interface ScheduleReduceProduct
  extends Pick<IProduct, "duration" | "buffertime"> {}

const WidgetScheduleReduce =
  (product: ScheduleReduceProduct) =>
  (
    previous: Array<WidgetSchedule<Date>>,
    current: ScheduleGetByStaffAndTag,
  ): Array<WidgetSchedule<Date>> => {
    const scheduleEnd = new Date(current.end);
    const duration = product.duration || 60;
    const buffertime = product.buffertime || 0;

    // we push start time everytime
    let start = new Date(current.start);
    let end;

    const previousHours = previous.find((p) => isSameDay(p.date, start));
    const hours = previousHours?.hours || [];

    // TODO: needs to create more hours
    while (
      isBefore(addMinutes(start, 1), scheduleEnd) &&
      isBefore(addMinutes(start, duration + buffertime), scheduleEnd)
    ) {
      end = addMinutes(start, duration + buffertime);
      hours.push({
        end,
        staff: current.staff,
        start,
      });

      start = addMinutes(start, 15);
    }

    if (!previousHours) {
      previous.push({ date: start, hours });
    }
    return previous;
  };

const WidgetScheduleCalculateBooking = (
  booking: Pick<IBooking, "start" | "end" | "staff">,
): ((schedule: WidgetSchedule<Date>) => WidgetSchedule<Date>) => {
  const { start, end, staff } = booking;
  return (schedule: WidgetSchedule<Date>): WidgetSchedule<Date> => ({
    ...schedule,
    hours: schedule.hours.filter((hour) => {
      if (hour.staff._id.toString() !== staff.toString()) {
        return true;
      }

      if (
        isWithinInterval(addMinutes(new Date(start), 1), {
          end: new Date(hour.end),
          start: new Date(hour.start),
        })
      ) {
        return false;
      }

      if (
        isWithinInterval(subMinutes(new Date(end), 1), {
          end: new Date(hour.end),
          start: new Date(hour.start),
        })
      ) {
        return false;
      }

      return true;
    }),
  });
};

interface WidgetServiceCalculatorProps {
  schedules: Array<ScheduleGetByStaffAndTag>;
  bookings: Array<IBooking>;
  carts: Array<ICart>;
  product: IProduct | IProductDocument;
}

export const WidgetServiceCalculator = ({
  schedules,
  bookings,
  carts,
  product,
}: WidgetServiceCalculatorProps) => {
  let scheduleDates = schedules.reduce(WidgetScheduleReduce(product), []);

  bookings.forEach((book) => {
    scheduleDates = scheduleDates.map(
      WidgetScheduleCalculateBooking({
        end: book.end,
        staff: book.staff._id,
        start: book.start,
      }),
    );
  });

  carts.forEach((cart) => {
    scheduleDates = scheduleDates.map(WidgetScheduleCalculateBooking(cart));
  });

  return scheduleDates;
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
  BookingModel.aggregate<IBooking>([
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
