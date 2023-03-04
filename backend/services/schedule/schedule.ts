import { DateHelpers } from "@jamalsoueidan/backend.express.helper-date";
import {
  ISchedule,
  ScheduleModel,
} from "@jamalsoueidan/backend.services.schedule";
import { ShopQuery } from "@jamalsoueidan/backend.types.api";
import {
  ScheduleServiceCreateGroupBodyProps,
  ScheduleServiceCreateGroupProps,
  ScheduleServiceCreateProps,
  ScheduleServiceDaysInterval,
  ScheduleServiceDestroyGroupProps,
  ScheduleServiceDestroyGroupReturn,
  ScheduleServiceDestroyProps,
  ScheduleServiceDestroyReturn,
  ScheduleServiceGetAllProps,
  ScheduleServiceGetGroupProps,
  ScheduleServiceGetGroupReturn,
  ScheduleServiceUpdateGroupBodyProps,
  ScheduleServiceUpdateGroupQueryProps,
  ScheduleServiceUpdateProps,
} from "@jamalsoueidan/backend.types.schedule";

import { Tag } from "@jamalsoueidan/backend.types.tag";
import { format } from "date-fns";
import mongoose from "mongoose";
import {
  createDateTime,
  getDaysFromRange,
  handleWinterSummerTime,
  resetTime,
} from "./schedule.helper";

export const ScheduleServiceGetAll = ({
  shop,
  staff,
  start,
  end,
}: ScheduleServiceGetAllProps & ShopQuery) =>
  ScheduleModel.find({
    end: {
      $lt: DateHelpers.closeOfDay(end),
    },
    shop,
    staff: new mongoose.Types.ObjectId(staff),
    start: {
      $gte: DateHelpers.beginningOfDay(start),
    },
  });

export const ScheduleServiceCreate = async (
  query: ScheduleServiceCreateProps["query"] & ShopQuery,
  body: ScheduleServiceCreateProps["body"],
) =>
  ScheduleModel.create({
    end: resetTime(body.end),
    shop: query.shop,
    staff: query.staff,
    start: resetTime(body.start),
    tag: body.tag,
  });

export const ScheduleServiceUpdate = (
  {
    schedule: _id,
    shop,
    staff,
  }: ScheduleServiceUpdateProps["query"] & ShopQuery,
  body: ScheduleServiceUpdateProps["body"],
) =>
  ScheduleModel.findOneAndUpdate(
    { _id, shop, staff },
    {
      end: resetTime(body.end),
      start: resetTime(body.start),
    },
    {
      returnOriginal: false,
    },
  );

export const ScheduleServiceDestroy = async ({
  schedule,
  staff,
  shop,
}: ScheduleServiceDestroyProps &
  ShopQuery): Promise<ScheduleServiceDestroyReturn> =>
  ScheduleModel.deleteOne({ _id: schedule, shop, staff });

export const ScheduleServiceGetGroup = async (
  query: ScheduleServiceGetGroupProps & ShopQuery,
) => {
  const schedules = await ScheduleModel.find(query).sort({ start: "asc" }); // sort is important to generate the body for editing group
  return schedules.reduce<ScheduleServiceGetGroupReturn>(
    (
      body: ScheduleServiceCreateGroupBodyProps,
      schedule: ISchedule,
      currentIndex: number,
    ) => {
      const day = format(
        schedule.start,
        "EEEE",
      ).toLowerCase() as ScheduleServiceDaysInterval;
      if (!body.days.includes(day)) {
        body.days.push(day);
      }
      if (currentIndex === 0) {
        // eslint-disable-next-line no-param-reassign
        body.start = schedule.start;
        // eslint-disable-next-line no-param-reassign
        body.tag = schedule.tag;
      }

      if (currentIndex + 1 === schedules.length) {
        // eslint-disable-next-line no-param-reassign
        body.end = schedule.end;
      }
      return body;
    },
    { days: [], end: new Date(), start: new Date(), tag: Tag.all_day },
  );
};

export const ScheduleServiceCreateGroup = async (
  query: ScheduleServiceCreateGroupProps["query"] & ShopQuery,
  body: ScheduleServiceCreateGroupProps["body"],
) => {
  const { shop, staff } = query;
  const groupId = new Date().getTime().toString();
  const daysSelected = getDaysFromRange(body.days, body);
  const schedules = handleWinterSummerTime(
    body,
    daysSelected.map((date) => ({
      end: createDateTime(date, body.end),
      groupId,
      shop,
      staff,
      start: createDateTime(date, body.start),
      tag: body.tag,
    })),
  );

  await ScheduleModel.insertMany(schedules);
  return schedules;
};

export const ScheduleServiceUpdateGroup = async (
  query: ScheduleServiceUpdateGroupQueryProps & ShopQuery,
  body: ScheduleServiceUpdateGroupBodyProps,
) => {
  await ScheduleServiceDestroyGroup(query);
  return ScheduleServiceCreateGroup(query, body);
};

export const ScheduleServiceDestroyGroup = async (
  query: ScheduleServiceDestroyGroupProps & ShopQuery,
): Promise<ScheduleServiceDestroyGroupReturn> => {
  const { shop, staff, groupId } = query;
  return ScheduleModel.deleteMany({ groupId, shop, staff });
};
