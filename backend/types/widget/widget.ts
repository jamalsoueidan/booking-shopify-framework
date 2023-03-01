import { BaseBooking } from "@jamalsoueidan/backend.types.booking";
import { Schedule } from "@jamalsoueidan/backend.types.schedule";
import { Tag } from "@jamalsoueidan/backend.types.tag";

export interface WidgetServiceAvailabilityProps {
  staff?: string;
  productId: number;
  start: Date;
  end: Date;
}

export interface WidgetStaff {
  tag: Tag;
  fullname: string;
  staff: string;
  avatar?: string;
  position?: string;
}

export type WidgetHourStaff = {
  staff: {
    _id: string;
    fullname: string;
  };
};

export type WidgetHourRange = {
  start: Date;
  end: Date;
};

export type WidgetHour = WidgetHourStaff & WidgetHourRange;

export interface WidgetSchedule {
  date: Date;
  hours: WidgetHour[];
}

export type WidgetServiceGetBookingsReturn = BaseBooking;

export type WidgetServiceGetSchedulesProps = Pick<
  Schedule,
  "staff" | "start" | "end"
> & {
  tag: Tag[];
};

export type WidgetServiceGetSchedulesReturn = Omit<Schedule, "staff"> &
  WidgetHourStaff;

export type WidgetServiceGetStaffProps = {
  productId: number;
  staff?: string;
  group?: string;
};

export type WidgetServiceGetStaffReturn = WidgetStaff;
