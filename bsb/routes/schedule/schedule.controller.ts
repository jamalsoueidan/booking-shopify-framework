import {
  ScheduleServiceCreate,
  ScheduleServiceCreateGroup,
  ScheduleServiceDestroy,
  ScheduleServiceDestroyGroup,
  ScheduleServiceGetAll,
  ScheduleServiceUpdate,
  ScheduleServiceUpdateGroup,
} from "@jamalsoueidan/bsb.services.schedule";
import { StaffServiceFindOne } from "@jamalsoueidan/bsb.services.staff";
import { ControllerProps } from "@jamalsoueidan/bsb.types.api";
import {
  ScheduleServiceCreateGroupProps,
  ScheduleServiceCreateProps,
  ScheduleServiceDestroyGroupProps,
  ScheduleServiceDestroyProps,
  ScheduleServiceGetAllProps,
  ScheduleServiceUpdateGroupBodyProps,
  ScheduleServiceUpdateGroupQueryProps,
  ScheduleServiceUpdateProps,
} from "@jamalsoueidan/bsb.types.schedule";

export const scheduleGetAll = ({
  query,
}: ControllerProps<ScheduleServiceGetAllProps>) => {
  const { shop, staff, start, end } = query;
  return ScheduleServiceGetAll({ end, shop, staff, start });
};

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

export type Range = {
  start: Date;
  end: Date;
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
>) => ScheduleServiceUpdateGroup(query, body);

export const scheduleDestroyGroup = async ({
  query,
}: ControllerProps<ScheduleServiceDestroyGroupProps>) =>
  ScheduleServiceDestroyGroup(query);
