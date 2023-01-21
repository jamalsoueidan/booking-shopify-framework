import { useDate } from "@jamalsoueidan/bsf.hooks.use-date";
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
import { getMonth, getYear, subDays } from "date-fns";
import React, { useCallback, useState } from "react";

export interface DatePickerInputProps
  extends Field<Date | undefined>,
    Partial<
      Omit<
        TextFieldProps,
        "error" | "onBlur" | "onChange" | "value" | "autoComplete"
      >
    > {
  disableDatesBefore?: Date;
}

export const DatePickerInput = (props: DatePickerInputProps) => {
  const { t } = useTranslation({ id: "date-picker-input", locales });
  const { format } = useDate();
  const [popoverActive, setPopoverActive] = useState(false);
  const [{ month, year }, setDate] = useState({
    month: getMonth(props.value || new Date()),
    year: getYear(props.value || new Date()),
  });

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const onChange = useCallback(
    (value: Range) => {
      props.onChange(value.start);
      togglePopoverActive();
    },
    [togglePopoverActive]
  );

  const handleMonthChange = useCallback(
    (month, year) => setDate({ month, year }),
    []
  );

  const activator = (
    <TextField
      label={props.label || t("label")}
      placeholder={props.placeholder}
      helpText={props.helpText}
      autoComplete="off"
      value={props.value ? format(props.value, "PPP") : ""}
      readOnly
      onChange={() => {}}
      prefix={<Icon source={CalendarMajor} />}
      onFocus={togglePopoverActive}
    />
  );

  return (
    <Popover
      sectioned
      preferredAlignment="left"
      preferredPosition="below"
      active={popoverActive}
      activator={activator}
      onClose={togglePopoverActive}
    >
      <DatePicker
        month={month}
        year={year}
        onChange={onChange}
        onMonthChange={handleMonthChange}
        selected={props.value}
        disableDatesBefore={props.disableDatesBefore || subDays(new Date(), 1)}
      />
    </Popover>
  );
};

const locales = {
  da: {
    label: "Dato",
  },
  en: {
    label: "Date",
  },
};
