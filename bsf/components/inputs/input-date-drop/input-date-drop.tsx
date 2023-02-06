import { WidgetSchedule } from "@jamalsoueidan/bsb.types";
import { InputDate, InputDateField } from "@jamalsoueidan/bsf.components.inputs.input-date";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { Icon, Popover, Range, TextField, TextFieldProps } from "@shopify/polaris";
import { CalendarMajor } from "@shopify/polaris-icons";
import { Field } from "@shopify/react-form";
import { format } from "date-fns";
import React, { useCallback, useState } from "react";

export type InputDateDropField = InputDateField;
export type InputDataDropData = Array<WidgetSchedule>;
export type InputDataDropInput = Partial<Omit<TextFieldProps, "error" | "onBlur" | "onChange" | "value">>;

export interface InputDateDropProps {
  field: Field<InputDateDropField>;
  input?: InputDataDropInput;
  data?: InputDataDropData;
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
      error={!input?.disabled && field.error}
      labelHidden={input?.labelHidden}
      autoComplete="off"
      value={field.value ? format(field.value, "PPP") : ""}
      readOnly
      onChange={() => {}}
      prefix={<Icon source={CalendarMajor} />}
      onFocus={togglePopoverActive}
      {...input}
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
