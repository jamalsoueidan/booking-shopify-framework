import { WidgetSchedule } from "@jamalsoueidan/bsb.mongodb.types";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import {
  Icon,
  Popover,
  Range,
  TextField,
  TextFieldProps,
} from "@shopify/polaris";
import { CalendarMajor } from "@shopify/polaris-icons";
import { Field } from "@shopify/react-form";
import { format, subDays } from "date-fns";
import React, { useCallback, useState } from "react";
import { InputDateBase } from "./date";

export interface InputDatePopOverProps
  extends Field<Date | undefined>,
    Partial<Omit<TextFieldProps, "error" | "onBlur" | "onChange" | "value">> {
  disableDatesBefore?: Date;
  data?: Array<WidgetSchedule>;
  onMonthChange?: (value: Range) => void;
}

export const InputDatePopOver = ({
  label,
  disableDatesBefore,
  data,
  labelHidden,
  onMonthChange,
  ...field
}: InputDatePopOverProps) => {
  const { t } = useTranslation({ id: "input-date-pop-over", locales });
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const handleOnChange = useCallback(
    (value: Date) => {
      field.onChange(value);
      togglePopoverActive();
    },
    [togglePopoverActive, field.onChange]
  );

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

  return (
    <Popover
      sectioned
      preferredAlignment="left"
      preferredPosition="below"
      active={popoverActive}
      activator={activator}
      onClose={togglePopoverActive}
    >
      <InputDateBase
        onChange={handleOnChange}
        onMonthChange={onMonthChange}
        data={data}
        selected={field.value}
        disableDatesBefore={disableDatesBefore || subDays(new Date(), 1)}
      />
    </Popover>
  );
};

const locales = {
  da: {
    label: "Vælg dato",
  },
  en: {
    label: "Pick a date",
  },
};
