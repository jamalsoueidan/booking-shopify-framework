import { WidgetSchedule } from "@jamalsoueidan/bsb.mongodb.types";
import { InputDate } from '@jamalsoueidan/bsf.components.inputs.input-date';
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { Labelled, Range, TextFieldProps } from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import React, { useId } from "react";

export interface InputDateFlatProps {
  field: Field<Date | undefined>;
  input?: Partial<
      Omit<
        TextFieldProps,
        "error" | "onBlur" | "onChange" | "value" | "autoComplete"
      >
    >;
  data?: Array<WidgetSchedule>;
  onMonthChange?: (value: Range) => void;
}

export const InputDateFlat = ({
  data,
  onMonthChange,
  input,
  field
}: InputDateFlatProps) => {
  const id = useId();
  const { t } = useTranslation({ id: "input-date-inline", locales });

  return (
    <Labelled id={`${id}-date-picker-id`} label={input?.label || t("label")} helpText={input?.helpText} error={field.error} labelHidden={input?.labelHidden}>
      <InputDate
        field={field}
        input={{onMonthChange}}
        data={data}
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
