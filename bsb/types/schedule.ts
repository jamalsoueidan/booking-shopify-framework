export interface Schedule {
  _id: string;
  staff: string;
  groupId?: string;
  start: Date;
  end: Date;
  tag: string;
  shop: string;
}

export type ScheduleBody = Pick<Schedule, "tag" | "start" | "end">;

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

export type ScheduleServiceUpdateBodyProps = Omit<ScheduleBody, "tag">;

export type ScheduleServiceUpdateProps = {
  query: ScheduleServiceUpdateQueryProps;
  body: ScheduleServiceUpdateBodyProps;
};

export type ScheduleServiceGetAllProps = Pick<
  Schedule,
  "staff" | "start" | "end"
>;

/*
  Group
*/

export type ScheduleServiceCreateGroupQueryProps = {
  staff: string;
};

export type ScheduleServiceCreateGroupBodyProps = Array<ScheduleBody>;
export type ScheduleServiceCreateGroupProps = {
  query: ScheduleServiceCreateGroupQueryProps;
  body: ScheduleServiceCreateGroupBodyProps;
};

export type ScheduleServiceUpdateGroupQueryProps = {
  groupId: string;
  staff: string;
};

export type ScheduleServiceUpdateGroupBodyProps = ScheduleBody;
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
