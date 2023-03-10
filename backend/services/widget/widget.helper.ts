import { ProductModel } from "@jamalsoueidan/backend.services.product";
import { Product } from "@jamalsoueidan/backend.types.product";
import {
  WidgetHourRange,
  WidgetHourStaff,
  WidgetSchedule,
} from "@jamalsoueidan/backend.types.widget";
import { addMinutes, isBefore, isSameDay, isWithinInterval } from "date-fns";
import mongoose, { PipelineStage } from "mongoose";

type WidgetCreateAvailabilityProduct = Pick<Product, "duration" | "buffertime">;
type WidgetCreateAvailabilitySchedule = WidgetHourRange & WidgetHourStaff;

/*
  We create availabilities from the shifts, we don't take into account the already booked or added to cart yet!
*/
export const WidgetCreateAvailability = (
  product: WidgetCreateAvailabilityProduct,
  schedules: WidgetCreateAvailabilitySchedule[],
) =>
  schedules.reduce(
    (
      previous: Array<WidgetSchedule>,
      current: WidgetCreateAvailabilitySchedule,
    ) => {
      const scheduleEnd = new Date(current.end);
      const duration = product.duration || 60;
      const buffertime = product.buffertime || 0;

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
          staff: {
            _id: current.staff._id,
            fullname: current.staff.fullname,
          },
          start,
        });
        start = addMinutes(start, 15);
      }

      if (!previousHours) {
        previous.push({ date: current.start, hours });
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
export const WidgetRemoveAvailability = (
  availabilities: Array<WidgetSchedule>,
  bookings: Array<WidgetRemoveShifts>,
) => {
  let filteredAvailabilities = availabilities;
  bookings.forEach((booking) => {
    filteredAvailabilities = filteredAvailabilities.map(
      (schedule: WidgetSchedule): WidgetSchedule => ({
        date: schedule.date,
        hours: schedule.hours.filter((hour) => {
          if (hour.staff._id.toString() !== booking.staff.toString()) {
            return true;
          }

          return (
            !isWithinInterval(booking.start, hour) &&
            !isWithinInterval(booking.end, hour)
          );
        }),
      }),
    );
  });
  return filteredAvailabilities;
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
        "staff.staff": new mongoose.Types.ObjectId(staff),
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

  if (products.length === 0) {
    return null;
  }
  return products[0];
};
