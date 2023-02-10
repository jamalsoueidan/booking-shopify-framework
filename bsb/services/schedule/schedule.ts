import { DateHelpers } from "@jamalsoueidan/bsb.helpers.date";
import { ScheduleModel } from "@jamalsoueidan/bsb.services.schedule";
import { StaffServiceFindOne } from "@jamalsoueidan/bsb.services.staff";
import {
  ScheduleServiceCreateOneProps,
  ScheduleServiceCreateProps,
  ScheduleServiceDestroyGroupProps,
  ScheduleServiceDestroyProps,
  ScheduleServiceFindByIdAndUpdateProps,
  ScheduleServiceGetByDateRangeProps,
  ScheduleServiceGetByStaffAndTagAggregate,
  ScheduleServiceGetByStaffAndTagProps,
  ScheduleServiceUpdateGroupBodyProps,
  ScheduleServiceUpdateGroupQueryProps,
  ShopQuery,
} from "@jamalsoueidan/bsb.types";
import {
  addHours,
  getHours,
  getMinutes,
  isAfter,
  isBefore,
  setMilliseconds,
  setMinutes,
  setSeconds,
  subHours,
} from "date-fns";
import mongoose from "mongoose";

const resetTime = (value) => setSeconds(setMilliseconds(value, 0), 0);

export const ScheduleServiceCreate = async ({
  staff,
  shop,
  schedules,
}: ScheduleServiceCreateProps & ShopQuery) => {
  const exists = await StaffServiceFindOne({
    _id: staff,
    shop,
  });

  if (exists) {
    if (Array.isArray(schedules)) {
      const groupId = new Date().getTime();
      return ScheduleModel.insertMany(
        schedules.map((b) => ({
          end: resetTime(b.end),
          groupId: groupId.toString(),
          shop,
          staff,
          start: resetTime(b.start),
          tag: b.tag,
        })),
      );
    }
    return ScheduleServiceCreateOne({
      end: resetTime(schedules.end),
      shop,
      staff,
      start: resetTime(schedules.start),
      tag: schedules.tag,
    });
  }
  return undefined;
};

export const ScheduleServiceCreateOne = async ({
  staff,
  shop,
  start,
  end,
  tag,
}: ScheduleServiceCreateOneProps & ShopQuery) => {
  return ScheduleModel.create({
    end: resetTime(end),
    shop,
    staff,
    start: resetTime(start),
    tag: tag,
  });
};

export const ScheduleServicefind = (document) => {
  const conditions = {
    ...(document.staff && { staff: document.staff }),
    ...(document.groupId && { groupId: document.groupId }),
    ...(document.start &&
      document.end && {
        $where: `this.start.toJSON().slice(0, 10) == "${document.start}" && this.end.toJSON().slice(0, 10) == "${document.end}"`,
      }),
  };

  return ScheduleModel.find(conditions);
};

export const ScheduleServiceFindOne = (filter) => ScheduleModel.findOne(filter);

export const ScheduleServiceFindByIdAndUpdate = ({
  query,
  body,
}: ScheduleServiceFindByIdAndUpdateProps) =>
  ScheduleModel.findByIdAndUpdate(query.scheduleId, body, {
    returnOriginal: false,
  });

export const ScheduleServiceDestroy = ({
  schedule,
  staff,
  shop,
}: ScheduleServiceDestroyProps & ShopQuery) => {
  ScheduleModel.deleteOne({ _id: schedule, shop, staff });
};

export const ScheduleServiceGetByDateRange = ({
  shop,
  staff,
  start,
  end,
}: ScheduleServiceGetByDateRangeProps & ShopQuery) =>
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

export const ScheduleServiceGetByStaffAndTag = ({
  tag,
  staff,
  start,
  end,
  shop,
}: ScheduleServiceGetByStaffAndTagProps & ShopQuery) =>
  ScheduleModel.aggregate<ScheduleServiceGetByStaffAndTagAggregate>([
    {
      $match: {
        shop,
        end: {
          $lt: DateHelpers.closeOfDay(end),
        },
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
        "staff.email": 0,
        "staff.phone": 0,
        "staff.position": 0,
        "staff.shop": 0,
        "staff.avatar": 0,
      },
    },
  ]);

export const ScheduleServiceUpdateGroup = async (
  query: ScheduleServiceUpdateGroupQueryProps & ShopQuery,
  body: ScheduleServiceUpdateGroupBodyProps,
) => {
  const { staff, shop, schedule, groupId } = query;

  const documents = await ScheduleServicefind({
    _id: schedule,
    groupId,
    staff,
  });

  if (documents.length > 0) {
    ScheduleModel.bulkWrite(
      documents.map((d) => {
        const startDateTime = body.start;
        const endDateTime = body.end;

        let start = new Date(d.start.setHours(getHours(startDateTime)));
        let end = new Date(d.end.setHours(getHours(endDateTime)));

        // startDateTime is before 30 oct
        const beforeAdd =
          isBefore(startDateTime, new Date(d.start.getFullYear(), 9, 30)) &&
          isAfter(start, new Date(d.start.getFullYear(), 9, 30)); // 9 is for october

        // startDateTime is after 27 march, and current is before
        const afterAdd =
          isAfter(startDateTime, new Date(d.start.getFullYear(), 2, 27)) &&
          isBefore(start, new Date(d.start.getFullYear(), 2, 27)); // 2 is for march

        // startDateTime is after 30 oct, and current is before subs
        const afterSubs =
          isAfter(startDateTime, new Date(d.start.getFullYear(), 9, 30)) && // 9 is for october
          isBefore(start, new Date(d.start.getFullYear(), 9, 30));

        // startDateTime is before 27 march, and current is after
        const beforeSubs =
          isBefore(startDateTime, new Date(d.start.getFullYear(), 2, 27)) &&
          isAfter(start, new Date(d.start.getFullYear(), 2, 27)); // 2 is for march

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
            filter: { _id: d._id, shop },
            update: {
              $set: {
                end,
                start,
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
  }

  throw new Error("Groupid doesn't exist");
};
