import { WidgetSchedule } from "@jamalsoueidan/bsb.mongodb.types";
import { DatePicker, Range } from "@shopify/polaris";
import {
  eachDayOfInterval,
  endOfMonth,
  getMonth,
  getYear,
  isPast,
  isSameDay,
  startOfMonth,
  subDays,
} from "date-fns";
import React, { useCallback, useId, useMemo, useState } from "react";

interface InputDateBaseProps {
  disableDatesBefore?: Date;
  data?: Array<WidgetSchedule>;
  selected: Date | undefined;
  onMonthChange?: (value: Range) => void;
  onChange?: (value: Date) => void;
}

export const InputDateBase = ({
  disableDatesBefore,
  data,
  onMonthChange,
  onChange,
  selected,
}: InputDateBaseProps) => {
  const id = useId();

  const getMonthFromValue = useMemo(
    () => ({
      month: getMonth(selected || new Date()),
      year: getYear(selected || new Date()),
    }),
    []
  );

  const handleOnChange = useCallback(
    (value: Range) => {
      onChange && onChange(value.start);
    },
    [onChange]
  );

  const [{ month, year }, setMonthYear] = useState(getMonthFromValue);

  const handleMonthChange = useCallback(
    (month: number, year: number) => {
      setMonthYear({ month, year });
      if (onMonthChange) {
        const start = startOfMonth(new Date(year, month));
        const end = endOfMonth(start);
        onMonthChange({
          start: isPast(start) ? new Date() : start,
          end,
        });
      }
    },
    [setMonthYear, onMonthChange]
  );

  const disableSpecificDates = useMemo(() => {
    if (!data) {
      return undefined;
    }

    const dayIntervals = eachDayOfInterval({
      start: new Date(year, month),
      end: endOfMonth(new Date(year, month)),
    });

    return dayIntervals.filter(
      (r) => !data?.find((s) => isSameDay(new Date(s.date), r))
    );
  }, [data, year, month]);

  return (
    <DatePicker
      month={month}
      year={year}
      onChange={handleOnChange}
      onMonthChange={handleMonthChange}
      selected={selected}
      disableDatesBefore={disableDatesBefore || subDays(new Date(), 1)}
      disableSpecificDates={disableSpecificDates}
    />
  );
};
