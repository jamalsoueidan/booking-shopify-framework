import {
  Schedule,
  ScheduleServiceRange,
} from "@jamalsoueidan/backend.types.schedule";
import {
  addHours,
  eachDayOfInterval,
  format,
  getHours,
  getMinutes,
  isAfter,
  isBefore,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds,
  subHours,
} from "date-fns";

export const getDaysFromRange = (
  days: string[],
  range: ScheduleServiceRange,
) => {
  const daysOfInterval = eachDayOfInterval(range);
  return daysOfInterval.filter((date) =>
    days.includes(format(date, "EEEE").toLowerCase()),
  );
};

export const createDateTime = (date: Date, time: Date) =>
  resetTime(new Date(`${format(date, "yyyy-MM-dd")} ${format(time, "pp")}`));

export const resetTime = (value) => setSeconds(setMilliseconds(value, 0), 0);

export const handleWinterSummerTime = (
  range: ScheduleServiceRange,
  schedules: Array<Omit<Schedule, "_id">>,
) =>
  schedules.map((schedule) => {
    const startDateTime = range.start;
    const endDateTime = range.end;

    let start = setHours(schedule.start, getHours(startDateTime));
    let end = setHours(schedule.end, getHours(endDateTime));

    /* ************ */
    /*  WINTER TIME */
    /* ************ */
    // startDateTime is before 30 oct
    const beforeAdd =
      isBefore(startDateTime, new Date(schedule.start.getFullYear(), 9, 30)) &&
      isAfter(start, new Date(schedule.start.getFullYear(), 9, 30)); // 9 is for october

    // startDateTime is after 30 oct, and current is before subs
    const afterSubs =
      isAfter(startDateTime, new Date(schedule.start.getFullYear(), 9, 30)) && // 9 is for october
      isBefore(start, new Date(schedule.start.getFullYear(), 9, 30));

    /* ************ */
    /*  SUMMER TIME */
    /* ************ */
    // startDateTime is after 27 march, and current is before
    const afterAdd =
      isAfter(startDateTime, new Date(schedule.start.getFullYear(), 2, 27)) &&
      isBefore(start, new Date(schedule.start.getFullYear(), 2, 27)); // 2 is for march

    // startDateTime is before 27 march, and current is after
    const beforeSubs =
      isBefore(startDateTime, new Date(schedule.start.getFullYear(), 2, 27)) &&
      isAfter(start, new Date(schedule.start.getFullYear(), 2, 27)); // 2 is for march

    if (beforeAdd || afterAdd) {
      start = addHours(start, 1);
      end = addHours(end, 1);
    } else if (afterSubs || beforeSubs) {
      start = subHours(start, 1);
      end = subHours(end, 1);
    }

    start = setMinutes(start, getMinutes(startDateTime));
    end = setMinutes(end, getMinutes(endDateTime));

    return {
      ...schedule,
      end,
      start,
    };
  });
