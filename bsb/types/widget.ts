import { BaseBooking } from "@jamalsoueidan/bsb.types/booking";
import { Schedule } from "./schedule";

export interface WidgetServiceAvailabilityProps {
  staff?: string;
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
  tag: string[];
};

export type WidgetServiceGetSchedulesReturn = Omit<Schedule, "staff"> &
  WidgetHourStaff;
