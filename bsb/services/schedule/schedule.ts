import { DateHelpers } from "@jamalsoueidan/bsb.helpers.date";
import { IScheduleDocument, ScheduleModel } from "@jamalsoueidan/bsb.services.schedule";
import { StaffServiceFindOne } from "@jamalsoueidan/bsb.services.staff";
import {
  ScheduleBodyCreate,
  ScheduleBodyUpdate,
  ScheduleGetByStaffAndTag,
  ScheduleUpdateOrDestroyQuery,
} from "@jamalsoueidan/bsb.types";
import {
  addHours,
  getHours,
  getMinutes,
  isAfter,
  isBefore,
  parseISO,
  setMilliseconds,
  setMinutes,
  setSeconds,
  subHours,
} from "date-fns";
import mongoose, { Aggregate, Types } from "mongoose";

interface CreateProps extends ScheduleBodyCreate {
  shop: string;
}

export const ScheduleServiceCreate = async ({
  staff,
  shop,
  schedules,
}: CreateProps): Promise<IScheduleDocument | IScheduleDocument[] | undefined> => {
  const exists = await StaffServiceFindOne({
    _id: staff,
    shop,
  });

  if (exists) {
    const resetSecMil = (value) => setSeconds(setMilliseconds(parseISO(value), 0), 0).toISOString();

    if (Array.isArray(schedules)) {
      const groupId = new Date().getTime();
      return ScheduleModel.insertMany(
        schedules.map((b) => ({
          end: resetSecMil(b.end),
          groupId: groupId.toString(),
          shop,
          staff,
          start: resetSecMil(b.start),
          tag: b.tag,
        })),
      );
    }
    return ScheduleModel.create({
      end: resetSecMil(schedules.end),
      shop,
      staff,
      start: resetSecMil(schedules.start),
      tag: schedules.tag,
    });
  }
  return undefined;
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

export const ScheduleServiceFindByIdAndUpdate = (scheduleId, document) =>
  ScheduleModel.findByIdAndUpdate(scheduleId, document, {
    returnOriginal: false,
  });

interface ScheduleServiceDestroyProps {
  schedule: string;
  staff: string;
  shop: string;
}

export const ScheduleServiceDestroy = ({ schedule, staff, shop }: ScheduleServiceDestroyProps) => {
  ScheduleModel.deleteOne({ _id: schedule, shop, staff });
};

interface GetByDateRangeProps {
  shop: string;
  staff: string;
  start: string;
  end: string;
}

export const ScheduleServiceGetByDateRange = ({ shop, staff, start, end }: GetByDateRangeProps) =>
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

interface GetByStaffAndTagProps {
  tag: string[];
  staff: Types.ObjectId[];
  start: string;
  end: string;
}

export const ScheduleServiceGetByStaffAndTag = ({
  tag,
  staff,
  start,
  end,
}: GetByStaffAndTagProps): Aggregate<Array<ScheduleGetByStaffAndTag>> =>
  ScheduleModel.aggregate([
    {
      $match: {
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
      },
    },
  ]);

interface ScheduleServiceUpdateGroupFilterProps extends ScheduleUpdateOrDestroyQuery {
  groupId: string;
  shop: string;
}

interface ScheduleServiceUpdateGroupProps {
  filter: ScheduleServiceUpdateGroupFilterProps;
  body: ScheduleBodyUpdate;
}

export const ScheduleServiceUpdateGroup = async ({ filter, body }: ScheduleServiceUpdateGroupProps) => {
  const { staff, shop, schedule, groupId } = filter;

  const documents = await ScheduleServicefind({
    _id: schedule,
    groupId,
    staff,
  });

  if (documents.length > 0) {
    ScheduleModel.bulkWrite(
      documents.map((d) => {
        const startDateTime = parseISO(body.start);
        const endDateTime = parseISO(body.end);

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
