import { WidgetSchedule } from "@jamalsoueidan/bsb.mongodb.types";
import { Range, TextFieldProps } from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import React from "react";
import { InputDateInline } from "./components/inline";
import { InputDatePopOver } from "./components/pop-over";

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

export const InputDate = (props: InputDateProps) => {
  if (props.mode === "inline") {
    return <InputDateInline {...props} />;
  }
  return <InputDatePopOver {...props} />;
};
