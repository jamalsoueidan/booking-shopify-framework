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

export type ScheduleServiceUpdateQueryProps = ScheduleServiceDestroyProps;

export type ScheduleServiceUpdateBodyProps = Omit<ScheduleBody, "tag">;

export type ScheduleServiceUpdateProps = {
  query: ScheduleServiceUpdateQueryProps;
  body: ScheduleServiceUpdateBodyProps;
};

export type ScheduleServiceCreateGroupQueryProps = Pick<Schedule, "staff">;
export type ScheduleServiceCreateGroupBodyProps = Array<ScheduleBody>;
export type ScheduleServiceCreateGroupProps = {
  query: ScheduleServiceCreateGroupQueryProps;
  body: ScheduleServiceCreateGroupBodyProps;
};

export type ScheduleServiceUpdateGroupQueryProps = {
  groupId: string;
} & ScheduleServiceUpdateQueryProps;
export type ScheduleServiceUpdateGroupBodyProps = ScheduleBody;
export interface ScheduleServiceUpdateGroupProps {
  query: ScheduleServiceUpdateGroupQueryProps;
  body: ScheduleServiceUpdateGroupBodyProps;
}

export type ScheduleServiceDestroyGroupProps = {
  groupId: string;
} & ScheduleServiceDestroyProps;

export type ScheduleServiceGetAllProps = Pick<
  Schedule,
  "staff" | "start" | "end"
>;
