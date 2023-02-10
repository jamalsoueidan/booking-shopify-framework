import { Schedule } from "./schedule";

export interface WidgetStaffQuery {
  productId: number;
}

export interface WidgetDateQuery {
  staff: string;
  productId: number;
  start: Date;
  end: Date;
}

export interface WidgetStaff {
  tag: string;
  fullname: string;
  staff: string;
  avatar?: string;
  position?: string;
  anyAvailable?: boolean;
}

export interface WidgetHourStaff {
  staff: {
    _id: string;
    fullname: string;
  };
}
export interface WidgetHourRange<T = string> {
  start: T;
  end: T;
}

export interface WidgetHour<T = string>
  extends WidgetHourStaff,
    WidgetHourRange<T> {}

export interface WidgetSchedule<T = string> {
  date: T;
  hours: WidgetHour<T>[];
}

export interface ScheduleGetByStaffAndTag extends Omit<Schedule, "staff"> {
  staff: {
    _id: string;
    fullname: string;
  };
}
