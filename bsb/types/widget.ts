import { Booking } from "@jamalsoueidan/bsb.types/booking";
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

export type WidgetHourStaff = {
  staff: {
    _id: string;
    fullname: string;
  };
};

export type WidgetHourRange<T = string> = {
  start: T;
  end: T;
};

export type WidgetHour<T = string> = WidgetHourStaff & WidgetHourRange<T>;

export interface WidgetSchedule<T = string> {
  date: T;
  hours: WidgetHour<T>[];
}

export type ScheduleGetByStaffAndTag = Omit<Schedule, "staff"> &
  WidgetHourStaff;

export type WidgetServiceGetBookingsReturn = Booking;
