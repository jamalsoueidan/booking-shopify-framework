import { DateHelpers } from "@jamalsoueidan/bsb.helpers.date";
import { ScheduleModel } from "@jamalsoueidan/bsb.services.schedule";
import { ShopQuery } from "@jamalsoueidan/bsb.types.api";
import {
  ScheduleServiceCreateGroupProps,
  ScheduleServiceCreateProps,
  ScheduleServiceDestroyGroupProps,
  ScheduleServiceDestroyGroupReturn,
  ScheduleServiceDestroyProps,
  ScheduleServiceDestroyReturn,
  ScheduleServiceGetAllProps,
  ScheduleServiceUGetGroupProps,
  ScheduleServiceUpdateGroupBodyProps,
  ScheduleServiceUpdateGroupQueryProps,
  ScheduleServiceUpdateProps,
} from "@jamalsoueidan/bsb.types.schedule";

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
  query: ScheduleServiceUGetGroupProps & ShopQuery,
) => {
  ScheduleModel.find(query);
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
