import { DateHelpers } from "@jamalsoueidan/bsb.helpers.date";
import { ScheduleModel } from "@jamalsoueidan/bsb.services.schedule";
import {
  ScheduleServiceCreateGroupProps,
  ScheduleServiceCreateProps,
  ScheduleServiceDestroyGroupProps,
  ScheduleServiceDestroyProps,
  ScheduleServiceGetAllProps,
  ScheduleServiceUpdateGroupBodyProps,
  ScheduleServiceUpdateGroupQueryProps,
  ScheduleServiceUpdateProps,
  ShopQuery,
} from "@jamalsoueidan/bsb.types";
import {
  addHours,
  getHours,
  getMinutes,
  isAfter,
  isBefore,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds,
  subHours,
} from "date-fns";
import mongoose from "mongoose";

const resetTime = (value) => setSeconds(setMilliseconds(value, 0), 0);

export const ScheduleServiceCreateGroup = (
  query: ScheduleServiceCreateGroupProps["query"] & ShopQuery,
  schedules: ScheduleServiceCreateGroupProps["body"],
) => {
  const { shop, staff } = query;
  const groupId = new Date().getTime().toString();
  return ScheduleModel.insertMany(
    schedules?.map((b) => ({
      end: resetTime(b.end),
      groupId,
      shop,
      staff,
      start: resetTime(b.start),
      tag: b.tag,
    })),
  );
};

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
  query: ScheduleServiceUpdateProps["query"] & ShopQuery,
  body: ScheduleServiceUpdateProps["body"],
) =>
  ScheduleModel.findByIdAndUpdate(query.schedule, body, {
    returnOriginal: false,
  });

export const ScheduleServiceDestroy = ({
  schedule,
  staff,
  shop,
}: ScheduleServiceDestroyProps & ShopQuery) => {
  ScheduleModel.deleteOne({ _id: schedule, shop, staff });
};

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
) => {
  const { shop, staff, schedule, groupId } = query;

  const documents = await ScheduleModel.countDocuments({
    _id: schedule,
    groupId,
    shop,
    staff,
  });

  if (documents > 0) {
    await ScheduleModel.deleteMany({ groupId, shop });
  } else {
    throw new Error("Groupid doesn't exist");
  }
};
