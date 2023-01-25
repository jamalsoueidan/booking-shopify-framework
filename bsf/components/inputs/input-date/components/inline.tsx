import { WidgetSchedule } from "@jamalsoueidan/bsb.mongodb.types";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { Labelled, Range, TextFieldProps } from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import { subDays } from "date-fns";
import React, { useId } from "react";
import { InputDateBase } from "./date";

export interface InputDateInlineProps
  extends Field<Date | undefined>,
    Partial<
      Omit<
        TextFieldProps,
        "error" | "onBlur" | "onChange" | "value" | "autoComplete"
      >
    > {
  disableDatesBefore?: Date;
  data?: Array<WidgetSchedule>;
  onMonthChange?: (value: Range) => void;
}

export const InputDateInline = ({
  label,
  disableDatesBefore,
  data,
  labelHidden,
  onMonthChange,
  ...field
}: InputDateInlineProps) => {
  const id = useId();
  const { t } = useTranslation({ id: "input-date-inline", locales });

  const labelFields = {
    label: label || t("label"),
    helpText: field.helpText,
    error: field.error,
    labelHidden,
  };

  return (
    <Labelled id={`${id}-date-picker-id`} {...labelFields}>
      <InputDateBase
        onChange={field.onChange}
        onMonthChange={onMonthChange}
        data={data}
        selected={field.value}
        disableDatesBefore={disableDatesBefore || subDays(new Date(), 1)}
      />
    </Labelled>
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
