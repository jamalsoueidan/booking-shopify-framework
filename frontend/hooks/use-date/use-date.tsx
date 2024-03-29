import { useSettings } from "@jamalsoueidan/frontend.providers.settings";
import { formatRelative as fnsFormatRelative } from "date-fns";
import {
  format as fnsFormat,
  formatInTimeZone as fnsFormatInTimezone,
  utcToZonedTime,
  zonedTimeToUtc,
} from "date-fns-tz";
import { da } from "date-fns/locale";
import { useCallback } from "react";

export const useDate = () => {
  const { timeZone, language } = useSettings();

  // from date object to date object in any timezone
  const toTimeZone = useCallback(
    (date: string | Date, overrideTimeZone?: string) =>
      utcToZonedTime(date, overrideTimeZone || timeZone),
    [timeZone],
  );

  // format date in settings timezone, or by overriding timezone
  const formatInTimezone = useCallback(
    (
      date: Date | string | number,
      formatStr: string,
      overrideTimeZone?: string,
    ) =>
      fnsFormatInTimezone(date, overrideTimeZone || timeZone, formatStr, {
        locale: language === "da" ? da : undefined,
      }),
    [timeZone, language],
  );

  // render the date as it is
  const format = useCallback(
    (date: Date, formatStr: string) =>
      fnsFormat(date, formatStr, {
        locale: language === "da" ? da : undefined,
      }),
    [language],
  );

  const formatRelative = useCallback(
    (date: Date) =>
      fnsFormatRelative(date, new Date(), {
        locale: language === "da" ? da : undefined,
      }),
    [language],
  );

  // from date object to local brower timezone
  const toUtc = useCallback(
    (date: string | Date, overrideTimeZone?: string) =>
      zonedTimeToUtc(date, overrideTimeZone || timeZone),
    [timeZone],
  );

  return {
    format,
    formatInTimezone,
    formatRelative,
    timeZone,
    toTimeZone,
    toUtc,
  };
};
