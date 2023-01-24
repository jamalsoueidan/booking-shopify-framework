import { WidgetSchedule } from "@jamalsoueidan/bsb.mongodb.types";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import {
  DatePicker,
  Icon,
  Labelled,
  Popover,
  Range,
  TextField,
  TextFieldProps,
} from "@shopify/polaris";
import { CalendarMajor } from "@shopify/polaris-icons";
import { Field } from "@shopify/react-form";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getMonth,
  getYear,
  isPast,
  isSameDay,
  startOfMonth,
  subDays,
} from "date-fns";
import React, { useCallback, useEffect, useId, useMemo, useState } from "react";

export interface InputDateProps
  extends Field<Date | undefined>,
    Partial<
      Omit<
        TextFieldProps,
        "error" | "onBlur" | "onChange" | "value" | "autoComplete"
      >
    > {
  disableDatesBefore?: Date;
  data?: Array<WidgetSchedule>;
  mode?: "inline";
  onMonthChange?: (value: Range) => void;
}

export const InputDate = ({
  label,
  disableDatesBefore,
  mode,
  data,
  labelHidden,
  onMonthChange,
  ...field
}: InputDateProps) => {
  const id = useId();
  const { t } = useTranslation({ id: "input-date", locales });
  const [popoverActive, setPopoverActive] = useState(false);
  const [{ month, year }, setDate] = useState({
    month: getMonth(field.value || new Date()),
    year: getYear(field.value || new Date()),
  });

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const onChange = useCallback(
    (value: Range) => {
      field.onChange(value.start);
      togglePopoverActive();
    },
    [togglePopoverActive]
  );

  const handleMonthChange = useCallback((month, year) => {
    setDate({ month, year });
  }, []);

  useEffect(() => {
    if (onMonthChange) {
      const start = startOfMonth(new Date(year, month));
      const end = endOfMonth(start);
      onMonthChange({
        start: isPast(start) ? new Date() : start,
        end,
      });
    }
  }, [month, year, onMonthChange]);

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

  const labelFields = {
    label: label || t("label"),
    helpText: field.helpText,
    error: field.error,
    labelHidden,
  };
  const activator = (
    <TextField
      {...labelFields}
      placeholder={field.placeholder}
      autoComplete="off"
      value={field.value ? format(field.value, "PPP") : ""}
      readOnly
      onChange={() => {}}
      prefix={<Icon source={CalendarMajor} />}
      onFocus={togglePopoverActive}
    />
  );

  const dateComponentMarkup = (
    <DatePicker
      month={month}
      year={year}
      onChange={onChange}
      onMonthChange={handleMonthChange}
      selected={field.value}
      disableDatesBefore={disableDatesBefore || subDays(new Date(), 1)}
      disableSpecificDates={disableSpecificDates}
    />
  );

  const componentMarkup =
    mode === "inline" ? (
      <Labelled id={`${id}-date-picker-id`} {...labelFields}>
        {dateComponentMarkup}
      </Labelled>
    ) : (
      <Popover
        sectioned
        preferredAlignment="left"
        preferredPosition="below"
        active={popoverActive}
        activator={activator}
        onClose={togglePopoverActive}
      >
        {dateComponentMarkup}
      </Popover>
    );

  return componentMarkup;
};

const locales = {
  da: {
    label: "Vælg dato",
  },
  en: {
    label: "Pick a date",
  },
};
