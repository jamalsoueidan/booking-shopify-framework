import { WidgetSchedule } from "@jamalsoueidan/bsb.mongodb.types";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import {
  DatePicker,
  Icon,
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
  isSameDay,
  subDays,
} from "date-fns";
import React, { useCallback, useMemo, useState } from "react";

export interface InputDateProps
  extends Field<Date | undefined>,
    Partial<
      Omit<
        TextFieldProps,
        "error" | "onBlur" | "onChange" | "value" | "autoComplete"
      >
    > {
  disableDatesBefore?: Date;
  data?: WidgetSchedule[];
  mode?: "inline";
}

export const InputDate = ({
  disableDatesBefore,
  mode,
  data,
  ...field
}: InputDateProps) => {
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

  const handleMonthChange = useCallback(
    (month, year) => setDate({ month, year }),
    []
  );

  const disableSpecificDates = useMemo(() => {
    if (!data) {
      return undefined;
    }

    const dayIntervals = eachDayOfInterval({
      start: new Date(year, month),
      end: endOfMonth(new Date(year, month)),
    });

    return dayIntervals.filter((r) => !data?.find((s) => isSameDay(s.date, r)));
  }, [data, year, month]);

  const activator = (
    <TextField
      label={field.label || t("label")}
      placeholder={field.placeholder}
      helpText={field.helpText}
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
      <Empty>{dateComponentMarkup}</Empty>
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
    label: "Dato",
  },
  en: {
    label: "Date",
  },
};

const Empty = ({ children }) => {
  return <>{children}</>;
};
