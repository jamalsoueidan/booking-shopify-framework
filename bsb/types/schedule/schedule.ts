import { Tag } from "@jamalsoueidan/bsb.types.tag";

export interface Schedule {
  _id: string;
  staff: string;
  groupId?: string;
  start: Date;
  end: Date;
  tag: Tag;
  shop: string;
}

export type ScheduleServiceGetAllProps = Pick<
  Schedule,
  "staff" | "start" | "end"
>;

export type ScheduleServiceRange = Pick<Schedule, "start" | "end">;

export type ScheduleBody = Pick<Schedule, "tag" | "start" | "end">;

/*
  Create
*/

export type ScheduleServiceCreateQueryProps = Pick<Schedule, "staff">;
export type ScheduleServiceCreateBodyProps = ScheduleBody;

export type ScheduleServiceCreateProps = {
  query: ScheduleServiceCreateQueryProps;
  body: ScheduleServiceCreateBodyProps;
};

export type ScheduleServiceDestroyProps = {
  schedule: string;
  staff: string;
};

export type ScheduleServiceDestroyReturn = {
  acknowledged: boolean;
  deletedCount: number;
};

export type ScheduleServiceUpdateQueryProps = {
  schedule: string;
  staff: string;
};

export type ScheduleServiceUpdateBodyProps = Omit<ScheduleBody, "tag">; // if we allow tag, and in product we choose the tag?

export type ScheduleServiceUpdateProps = {
  query: ScheduleServiceUpdateQueryProps;
  body: ScheduleServiceUpdateBodyProps;
};

/*
  Group
*/
export type ScheduleServiceUGetGroupProps = {
  groupId: string;
  staff: string;
};

export type ScheduleServiceCreateGroupQueryProps = {
  staff: string;
};

export type ScheduleServiceDaysInterval =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type ScheduleServiceCreateGroupBodyProps = ScheduleBody & {
  days: Array<ScheduleServiceDaysInterval>;
};

export type ScheduleServiceCreateGroupProps = {
  query: ScheduleServiceCreateGroupQueryProps;
  body: ScheduleServiceCreateGroupBodyProps;
};

export type ScheduleServiceUpdateGroupQueryProps =
  ScheduleServiceUGetGroupProps;

export type ScheduleServiceUpdateGroupBodyProps =
  ScheduleServiceCreateGroupBodyProps;
export interface ScheduleServiceUpdateGroupProps {
  query: ScheduleServiceUpdateGroupQueryProps;
  body: ScheduleServiceUpdateGroupBodyProps;
}

export type ScheduleServiceDestroyGroupProps =
  ScheduleServiceUpdateGroupQueryProps;

export type ScheduleServiceDestroyGroupReturn = {
  acknowledged: boolean;
  deletedCount: number;
};
