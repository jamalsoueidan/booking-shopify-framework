import { IProductModel, ProductModel } from "@jamalsoueidan/bsb.mongodb.models";
import {
  BookingResponse,
  CartGetByStaff,
  ScheduleGetByStaffAndTag,
  WidgetSchedule,
  WidgetStaff,
} from "@jamalsoueidan/bsb.mongodb.types";
import { addMinutes, isBefore, isSameDay, isWithinInterval, subMinutes } from "date-fns";
import mongoose, { Aggregate } from "mongoose";

interface WidgetSericeGetProductProps {
  shop: string;
  productId: number;
  staff?: string;
}

export const WidgetServiceGetProduct = async ({
  shop,
  productId,
  staff,
}: WidgetSericeGetProductProps): Promise<IProductModel | null> => {
  if (!staff) {
    return ProductModel.findOne({
      shop,
      productId,
      active: true,
    });
  }

  const products = await ProductModel.aggregate([
    {
      $match: {
        shop,
        productId,
        active: true,
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
    return {
      ...product,
      staff: [product.staff],
    };
  }
  return null;
};

// get all staff from product for widget
export const WidgetServiceGetStaff = ({ shop, productId }: Partial<IProductModel>): Aggregate<Array<WidgetStaff>> => {
  return ProductModel.aggregate([
    {
      $match: {
        productId,
        shop,
        active: true,
      },
    },
    {
      $unwind: { path: "$staff" },
    },
    {
      $lookup: {
        from: "Staff",
        localField: "staff.staff",
        foreignField: "_id",
        as: "staff.staff",
      },
    },
    {
      $unwind: {
        path: "$staff.staff",
      },
    },
    {
      $addFields: {
        "staff.staff.tag": "$staff.tag",
        "staff.staff.staff": "$staff.staff._id",
        "staff.staff._id": "$staff._id",
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
        shop: 0,
        email: 0,
        active: 0,
        phone: 0,
        __v: 0,
      },
    },
  ]);
};

interface ScheduleReduceProduct extends Pick<IProductModel, "duration" | "buffertime"> {}

const WidgetScheduleReduce =
  (product: ScheduleReduceProduct) =>
  (previous: Array<WidgetSchedule<Date>>, current: ScheduleGetByStaffAndTag): Array<WidgetSchedule<Date>> => {
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
        start,
        end,
        staff: current.staff,
      });

      start = addMinutes(start, 15);
    }

    if (!previousHours) {
      previous.push({ date: start, hours });
    }
    return previous;
  };

const WidgetScheduleCalculateBooking = (
  book: CartGetByStaff,
): ((schedule: WidgetSchedule<Date>) => WidgetSchedule<Date>) => {
  const { start, end, staff } = book;
  return (schedule: WidgetSchedule<Date>): WidgetSchedule<Date> => {
    return {
      ...schedule,
      hours: schedule.hours.filter((hour) => {
        if (hour.staff._id.toString() !== staff.toString()) {
          return true;
        }

        if (
          isWithinInterval(addMinutes(new Date(start), 1), {
            start: new Date(hour.start),
            end: new Date(hour.end),
          })
        ) {
          return false;
        }

        if (
          isWithinInterval(subMinutes(new Date(end), 1), {
            start: new Date(hour.start),
            end: new Date(hour.end),
          })
        ) {
          return false;
        }

        return true;
      }),
    };
  };
};

interface WidgetServiceCalculatorProps {
  schedules: Array<ScheduleGetByStaffAndTag>;
  bookings: Array<BookingResponse>;
  carts: Array<CartGetByStaff>;
  product: IProductModel;
}

export const WidgetServiceCalculator = ({ schedules, bookings, carts, product }: WidgetServiceCalculatorProps) => {
  let scheduleDates = schedules.reduce(WidgetScheduleReduce(product), []);

  bookings.forEach((book) => {
    scheduleDates = scheduleDates.map(
      WidgetScheduleCalculateBooking({
        end: book.end,
        start: book.start,
        staff: book.staff._id,
      }),
    );
  });

  carts.forEach((cart) => {
    scheduleDates = scheduleDates.map(WidgetScheduleCalculateBooking(cart));
  });

  return scheduleDates;
};
