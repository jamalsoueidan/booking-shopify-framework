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
  ScheduleServiceUpdateGroupBodyProps,
  ScheduleServiceUpdateGroupQueryProps,
  ScheduleServiceUpdateProps,
} from "@jamalsoueidan/bsb.types.schedule";

import {
  addHours,
  getHours,
  getMinutes,
  isAfter,
  isBefore,
  setHours,
  setMinutes,
  subHours,
} from "date-fns";
import mongoose from "mongoose";
import {
  createDateTime,
  getDatesFromSelectedDaysInCalendar,
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

export const ScheduleServiceCreateGroup = async (
  query: ScheduleServiceCreateGroupProps["query"] & ShopQuery,
  body: ScheduleServiceCreateGroupProps["body"],
) => {
  const { shop, staff } = query;
  const groupId = new Date().getTime().toString();
  const daysSelected = getDatesFromSelectedDaysInCalendar(body.days, body);
  const schedules = daysSelected.map((date) => ({
    end: createDateTime(date, body.end),
    groupId,
    shop,
    staff,
    start: createDateTime(date, body.start),
    tag: body.tag,
  }));

  await ScheduleModel.insertMany(schedules);
  return schedules;
};

export const ScheduleServiceUpdateGroup = async (
  query: ScheduleServiceUpdateGroupQueryProps & ShopQuery,
  body: ScheduleServiceUpdateGroupBodyProps,
) => {
  const { staff, shop, groupId } = query;

  const schedules = await ScheduleModel.find({
    groupId,
    shop,
    staff,
  });

  if (schedules.length > 0) {
    await ScheduleModel.bulkWrite(
      schedules.map((schedule) => {
        const startDateTime = body.start;
        const endDateTime = body.end;

        let start = setHours(schedule.start, getHours(startDateTime));
        let end = setHours(schedule.end, getHours(endDateTime));

        // startDateTime is before 30 oct
        const beforeAdd =
          isBefore(
            startDateTime,
            new Date(schedule.start.getFullYear(), 9, 30),
          ) && isAfter(start, new Date(schedule.start.getFullYear(), 9, 30)); // 9 is for october

        // startDateTime is after 27 march, and current is before
        const afterAdd =
          isAfter(
            startDateTime,
            new Date(schedule.start.getFullYear(), 2, 27),
          ) && isBefore(start, new Date(schedule.start.getFullYear(), 2, 27)); // 2 is for march

        // startDateTime is after 30 oct, and current is before subs
        const afterSubs =
          isAfter(
            startDateTime,
            new Date(schedule.start.getFullYear(), 9, 30),
          ) && // 9 is for october
          isBefore(start, new Date(schedule.start.getFullYear(), 9, 30));

        // startDateTime is before 27 march, and current is after
        const beforeSubs =
          isBefore(
            startDateTime,
            new Date(schedule.start.getFullYear(), 2, 27),
          ) && isAfter(start, new Date(schedule.start.getFullYear(), 2, 27)); // 2 is for march

        if (beforeAdd || afterAdd) {
          start = addHours(start, 1);
          end = addHours(end, 1);
        } else if (afterSubs || beforeSubs) {
          start = subHours(start, 1);
          end = subHours(end, 1);
        }

        start = setMinutes(start, getMinutes(startDateTime));
        end = setMinutes(end, getMinutes(endDateTime));

        return {
          updateOne: {
            filter: { _id: schedule._id, shop },
            update: {
              $set: {
                end,
                start,
                tag: body.tag,
              },
            },
          },
        };
      }),
    );
  }
};

export const ScheduleServiceDestroyGroup = async (
  query: ScheduleServiceDestroyGroupProps & ShopQuery,
): Promise<ScheduleServiceDestroyGroupReturn> => {
  const { shop, staff, groupId } = query;
  return ScheduleModel.deleteMany({ groupId, shop, staff });
};
