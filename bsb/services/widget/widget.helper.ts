import { ProductModel } from "@jamalsoueidan/bsb.services.product";
import {
  Product,
  WidgetHourRange,
  WidgetHourStaff,
  WidgetSchedule,
} from "@jamalsoueidan/bsb.types";
import {
  addMinutes,
  isBefore,
  isSameDay,
  isWithinInterval,
  subMinutes,
} from "date-fns";
import { PipelineStage } from "mongoose";

type WidgetCreateAvailabilityProduct = Pick<Product, "duration" | "buffertime">;
type WidgetCreateAvailabilitySchedule = WidgetHourRange<Date> & WidgetHourStaff;

/*
  We create availabilities from the shifts, we don't take into account the already booked or added to cart yet!
*/
export const WidgetCreateAvailability = (
  product: WidgetCreateAvailabilityProduct,
  schedules: WidgetCreateAvailabilitySchedule[],
) =>
  schedules.reduce(
    (
      previous: Array<WidgetSchedule<Date>>,
      current: WidgetCreateAvailabilitySchedule,
    ) => {
      const scheduleEnd = current.end;
      const duration = product.duration || 60;
      const buffertime = product.buffertime || 0;

      // we push start time everytime
      let start = current.start;
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
          staff: {
            _id: current.staff._id,
            fullname: current.staff.fullname,
          },
          start,
        });

        start = addMinutes(start, 15);
      }

      if (!previousHours) {
        previous.push({ date: start, hours });
      }
      return previous;
    },
    [],
  );

type WidgetRemoveShifts = {
  start: Date;
  end: Date;
  staff: string;
};

/*
  We remove the availabilities that is already booked.
*/
export const WidgetRemoveAvailability = (booking: WidgetRemoveShifts) => {
  return (schedule: WidgetSchedule<Date>): WidgetSchedule<Date> => ({
    ...schedule,
    hours: schedule.hours.filter((hour) => {
      if (hour.staff._id !== booking.staff) {
        return true;
      }

      if (
        isWithinInterval(addMinutes(new Date(booking.start), 1), {
          end: new Date(hour.end),
          start: new Date(hour.start),
        })
      ) {
        return false;
      }

      if (
        isWithinInterval(subMinutes(new Date(booking.end), 1), {
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

interface WidgetSericeGetProductProps {
  shop: string;
  productId: number;
  staff?: string;
}

/*
  --
*/
export const WidgetServiceGetProduct = async ({
  shop,
  productId,
  staff,
}: WidgetSericeGetProductProps) => {
  const pipeline: PipelineStage[] = [
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
        "staff.staff": staff,
      },
    });
  }

  pipeline.push({
    $group: {
      _id: "$_id",
      staff: { $push: "$staff" },
    },
  });

  const products = await ProductModel.aggregate(pipeline);

  if (products.length == 0) {
    return null;
  }
  return products[0];
};
