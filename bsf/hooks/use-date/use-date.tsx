import { useSettings } from "@jamalsoueidan/bsf.hooks.use-settings";
import { format as dfFormat } from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import da from "date-fns/locale/da";
import { useCallback } from "react";

interface formatOptions {
  locale?: Locale;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  firstWeekContainsDate?: number;
  useAdditionalWeekYearTokens?: boolean;
  useAdditionalDayOfYearTokens?: boolean;
}

export const useDate = () => {
  const { timeZone, language } = useSettings();

  const toTimeZone = useCallback(
    (fromUTC: string | Date) => utcToZonedTime(fromUTC, timeZone),
    [timeZone]
  );

  const toUtc = useCallback(
    (date: string | Date) => zonedTimeToUtc(date, timeZone),
    [timeZone]
  );

  //TODO: needs to be moved to use-dateFns hook instead
  const format = useCallback(
    (date: Date, format: string, options: formatOptions = {}) =>
      dfFormat(date, format, {
        ...options,
        locale: language === "da" ? da : undefined,
      }),
    [language]
  );

  return {
    toTimeZone,
    toUtc,
    format,
  };
};
