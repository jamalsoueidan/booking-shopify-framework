import { ScheduleServiceRange } from "@jamalsoueidan/bsb.types.schedule";
import {
  eachDayOfInterval,
  format,
  setMilliseconds,
  setSeconds,
} from "date-fns";

export const getDatesFromSelectedDaysInCalendar = (
  days: Date[],
  range: ScheduleServiceRange,
) => {
  const allDaysInCalendarRange = eachDayOfInterval(range);
  const lowerCaseDayNames = days.map((day) =>
    format(day, "EEEE").toLowerCase(),
  );
  return allDaysInCalendarRange.filter((date) => {
    const currentDayTextInDate = format(date, "EEEE").toLowerCase();
    return lowerCaseDayNames.includes(currentDayTextInDate);
  });
};

export const createDateTime = (date: Date, time: Date) =>
  resetTime(new Date(`${format(date, "yyyy-MM-dd")} ${format(time, "pp")}`));

export const resetTime = (value) => setSeconds(setMilliseconds(value, 0), 0);
