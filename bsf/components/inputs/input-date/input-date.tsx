import { WidgetSchedule } from "@jamalsoueidan/bsb.types";
import { DatePicker, DatePickerProps, Range } from "@shopify/polaris";
import { Field } from "@shopify/react-form";
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
import React, { useCallback, useMemo, useState } from "react";

interface InputDatePickerProps
  extends Partial<Omit<DatePickerProps, "onMonthChange">> {
  onMonthChange?: (value: Range) => void;
}

export type InputDateField = Date | undefined;
export type InputDateData = Array<WidgetSchedule>;
export interface InputDateProps {
  field: Field<InputDateField>;
  data?: InputDateData;
  input?: InputDatePickerProps;
  disableDates?: boolean;
}

export const InputDate = ({
  field,
  data,
  input,
  disableDates,
}: InputDateProps) => {
  const getMonthFromValue = useMemo(
    () => ({
      month: getMonth(field.value || new Date()),
      year: getYear(field.value || new Date()),
    }),
    [field.value],
  );

  const handleOnChange = useCallback(
    (value: Range) => {
      field.onChange(value.start);
    },
    [field],
  );

  const [{ month, year }, setMonthYear] = useState(getMonthFromValue);

  const handleMonthChange = useCallback(
    (month: number, year: number) => {
      setMonthYear({ month, year });
      if (input?.onMonthChange) {
        const start = startOfMonth(new Date(year, month));
        const end = endOfMonth(start);
        input?.onMonthChange({
          end,
          start: isPast(start) ? new Date() : start,
        });
      }
    },
    [setMonthYear, input],
  );

  const disableSpecificDates = useMemo(() => {
    if (!disableDates) {
      return;
    }

    const dayIntervals = eachDayOfInterval({
      end: endOfMonth(new Date(year, month)),
      start: new Date(year, month),
    });

    return dayIntervals.filter(
      (r) => !data?.find((s) => isSameDay(new Date(s.date), r)),
    );
  }, [data, year, month]);

  return (
    <DatePicker
      month={month}
      year={year}
      onChange={handleOnChange}
      onMonthChange={handleMonthChange}
      selected={field?.value}
      disableDatesBefore={input?.disableDatesBefore || subDays(new Date(), 1)}
      disableSpecificDates={disableSpecificDates}
    />
  );
};
