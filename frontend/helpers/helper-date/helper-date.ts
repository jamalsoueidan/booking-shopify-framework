import { setHours, setMilliseconds, setMinutes, setSeconds } from "date-fns";

export const resetDateTime = (value: Date, hour?: number) => {
  const date = hour ? setHours(value, hour) : value;
  return setMinutes(setSeconds(setMilliseconds(date, 0), 0), 0);
};
