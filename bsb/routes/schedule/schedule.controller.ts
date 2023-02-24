import {
  ISchedule,
  ScheduleModel,
  ScheduleServiceCreate,
  ScheduleServiceCreateGroup,
  ScheduleServiceDestroy,
  ScheduleServiceDestroyGroup,
  ScheduleServiceGetAll,
  ScheduleServiceUpdate,
} from "@jamalsoueidan/bsb.services.schedule";
import { StaffServiceFindOne } from "@jamalsoueidan/bsb.services.staff";
import { ControllerProps } from "@jamalsoueidan/bsb.types.api";
import {
  ScheduleServiceCreateGroupBodyProps,
  ScheduleServiceCreateGroupProps,
  ScheduleServiceCreateProps,
  ScheduleServiceDaysInterval,
  ScheduleServiceDestroyGroupProps,
  ScheduleServiceDestroyProps,
  ScheduleServiceGetAllProps,
  ScheduleServiceUGetGroupProps,
  ScheduleServiceUpdateGroupBodyProps,
  ScheduleServiceUpdateGroupQueryProps,
  ScheduleServiceUpdateProps,
} from "@jamalsoueidan/bsb.types.schedule";
import { Tag } from "@jamalsoueidan/bsb.types.tag";
import { format } from "date-fns";

export const scheduleGetAll = ({
  query,
}: ControllerProps<ScheduleServiceGetAllProps>) => {
  const { shop, staff, start, end } = query;
  return ScheduleServiceGetAll({ end, shop, staff, start });
};

/*
 * Create
 **************************** */

export const scheduleCreate = ({
  query,
  body,
}: ControllerProps<
  ScheduleServiceCreateProps["query"],
  ScheduleServiceCreateProps["body"]
>) => ScheduleServiceCreate(query, body);

export const scheduleUpdate = async ({
  query,
  body,
}: ControllerProps<
  ScheduleServiceUpdateProps["query"],
  ScheduleServiceUpdateProps["body"]
>) => {
  const { shop, staff } = query;

  const exists = await StaffServiceFindOne({ _id: staff, shop });
  if (!exists) {
    throw "does not exist";
  }
  return ScheduleServiceUpdate(query, body);
};

export const scheduleDestroy = ({
  query,
}: ControllerProps<ScheduleServiceDestroyProps>) => {
  const { shop, staff, schedule } = query;
  return ScheduleServiceDestroy({
    schedule,
    shop,
    staff,
  });
};

/*
 * Group
 **************************** */

export const scheduleGetGroup = async ({
  query,
}: ControllerProps<ScheduleServiceUGetGroupProps>) => {
  const schedules = await ScheduleModel.find(query).sort({ start: "asc" }); // sort is important to generate the body for editing group
  return schedules.reduce<ScheduleServiceCreateGroupBodyProps>(
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

export const scheduleCreateGroup = ({
  query,
  body,
}: ControllerProps<
  ScheduleServiceCreateGroupProps["query"],
  ScheduleServiceCreateGroupProps["body"]
>) => ScheduleServiceCreateGroup(query, body);

export const scheduleUpdateGroup = async ({
  query,
  body,
}: ControllerProps<
  ScheduleServiceUpdateGroupQueryProps,
  ScheduleServiceUpdateGroupBodyProps
>) => {
  await ScheduleServiceDestroyGroup(query);
  return ScheduleServiceCreateGroup(query, body);
};

export const scheduleDestroyGroup = async ({
  query,
}: ControllerProps<ScheduleServiceDestroyGroupProps>) =>
  ScheduleServiceDestroyGroup(query);
