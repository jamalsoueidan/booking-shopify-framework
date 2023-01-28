import { WidgetSchedule } from "@jamalsoueidan/bsb.mongodb.types";
import { InputDate } from "@jamalsoueidan/bsf.components.inputs.input-date";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { Icon, Popover, Range, TextField, TextFieldProps } from "@shopify/polaris";
import { CalendarMajor } from "@shopify/polaris-icons";
import { Field } from "@shopify/react-form";
import { format } from "date-fns";
import React, { useCallback, useState } from "react";

export interface InputDateDropProps {
  field: Field<Date | undefined>;
  input?: Partial<Omit<TextFieldProps, "error" | "onBlur" | "onChange" | "value">>;
  data?: Array<WidgetSchedule>;
  onMonthChange?: (value: Range) => void;
}

export const InputDateDrop = ({ field, data, input, onMonthChange }: InputDateDropProps) => {
  const { t } = useTranslation({ id: "input-date-pop-over", locales });
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(() => setPopoverActive((popoverActive) => !popoverActive), []);

  const handleOnChange = useCallback(
    (value: Date) => {
      field.onChange(value);
      togglePopoverActive();
    },
    [field, togglePopoverActive],
  );

  const activator = (
    <TextField
      label={input?.label || t("label")}
      helpText={input?.helpText}
      error={field.error}
      labelHidden={input?.labelHidden}
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
      <InputDate field={{ ...field, onChange: handleOnChange }} input={{ onMonthChange }} data={data} />
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
