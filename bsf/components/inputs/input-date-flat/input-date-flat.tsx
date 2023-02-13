import { WidgetSchedule } from "@jamalsoueidan/bsb.types";
import {
  InputDate,
  InputDateField,
} from "@jamalsoueidan/bsf.components.inputs.input-date";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { Labelled, Range, TextFieldProps } from "@shopify/polaris";
import { Field } from "@shopify/react-form";

import React, { useId } from "react";

export type InputDateFlatField = InputDateField;
export type InputDataFlatData = Array<WidgetSchedule>;
export type InputDataFlatInput = Partial<
  Omit<TextFieldProps, "error" | "onBlur" | "onChange" | "value">
>;

export interface InputDateFlatProps {
  field: Field<InputDateFlatField>;
  input?: InputDataFlatInput;
  data?: InputDataFlatData;
  onMonthChange?: (value: Range) => void;
  disableDates?: boolean;
}

export const InputDateFlat = ({
  data,
  onMonthChange,
  input,
  field,
  disableDates,
}: InputDateFlatProps) => {
  const id = useId();
  const { t } = useTranslation({ id: "input-date-inline", locales });

  return (
    <Labelled
      id={`${id}-date-picker-id`}
      label={input?.label || t("label")}
      helpText={input?.helpText}
      error={field.error}
      labelHidden={input?.labelHidden}
    >
      <InputDate
        field={field}
        input={{ onMonthChange }}
        data={data}
        disableDates={disableDates}
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
