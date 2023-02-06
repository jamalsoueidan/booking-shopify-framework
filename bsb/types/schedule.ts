export interface Schedule {
  _id: string;
  staff: string;
  groupId?: string;
  start: Date;
  end: Date;
  tag: string;
  shop: string;
}

export interface ScheduleBodyUpdate
  extends Omit<Schedule, "shop" | "_id" | "staff" | "start" | "end"> {
  start: string;
  end: string;
}

export interface ScheduleBodyCreate {
  staff: string;
  schedules: ScheduleBodyUpdateOrCreate;
}

export type ScheduleBodyUpdateOrCreate =
  | ScheduleBodyUpdate[]
  | ScheduleBodyUpdate;

export interface ScheduleGetQuery {
  staff: string;
  start: string;
  end: string;
}

export interface ScheduleUpdateOrDestroyQuery {
  staff: string;
  schedule: string;
}

export interface ScheduleGetByStaffAndTag extends Omit<Schedule, "staff"> {
  staff: {
    _id: string;
    fullname: string;
  };
}
