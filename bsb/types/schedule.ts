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

export type ScheduleServiceCreateProps = {
  staff: string;
  schedules: ScheduleBody | Array<ScheduleBody>;
};

export type ScheduleServiceCreateOneProps = {
  staff: string;
} & ScheduleBody;

export type ScheduleServiceDestroyProps = {
  schedule: string;
} & Pick<Schedule, "staff">;

export type ScheduleServiceGetByDateRangeProps = Pick<
  Schedule,
  "staff" | "start" | "end"
>;

export type ScheduleServiceGetByStaffAndTagProps = Pick<
  Schedule,
  "staff" | "start" | "end"
> & { tag: string[] };

export type ScheduleServiceUpdateGroupQueryProps = {
  staff: string;
  schedule: string;
  groupId: string;
};

export type ScheduleServiceUpdateGroupBodyProps = ScheduleBody;
export interface ScheduleServiceUpdateGroupProps {
  query: ScheduleServiceUpdateGroupQueryProps;
  body: ScheduleServiceUpdateGroupBodyProps;
}

export interface ScheduleUpdateOrDestroyQuery {
  staff: string;
  schedule: string;
}
export interface ScheduleServiceDestroyGroupProps {
  staff: string;
  schedule: string;
  groupId: string;
}

export interface ScheduleServiceGetByStaffAndTagAggregate
  extends Omit<Schedule, "staff"> {
  staff: {
    _id: string;
    fullname: string;
  };
}

export type ScheduleServiceFindByIdAndUpdateQueryProps = {
  scheduleId: string;
};

export type ScheduleServiceFindByIdAndUpdateBodyProps = Pick<
  Schedule,
  "start" | "end"
>;

export type ScheduleServiceFindByIdAndUpdateProps = {
  query: ScheduleServiceFindByIdAndUpdateQueryProps;
  body: ScheduleServiceFindByIdAndUpdateBodyProps;
};
