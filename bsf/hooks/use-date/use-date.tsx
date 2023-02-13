import { useSettings } from "@jamalsoueidan/bsf.hooks.use-settings";
import { formatInTimeZone, utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
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

  // from timezone to format show user datetime
  const format = useCallback(
    (
      date: Date | string | number,
      formatStr: string,
      overrideTimeZone?: string,
    ) =>
      formatInTimeZone(date, overrideTimeZone || timeZone, formatStr, {
        locale: language === "da" ? da : undefined,
      }),
    [timeZone, language],
  );

  // from date object to utc
  const toUtc = useCallback(
    (date: string | Date, overrideTimeZone?: string) =>
      zonedTimeToUtc(
        format(date, "yyyy-MM-dd HH:mm:ss", overrideTimeZone || timeZone),
        overrideTimeZone || timeZone,
      ),
    [timeZone, format],
  );

  return {
    format,
    toUtc,
    toTimeZone,
    timeZone,
  };
};
