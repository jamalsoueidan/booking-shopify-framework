import { SelectProps } from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import { ReactNode } from "react";

export interface InputTimerModeProps
  extends Field<InputTimerFieldType>,
    Partial<Omit<SelectProps, "onChange" | "error" | "onBlur" | "value">> {
  options?: StrictOption[];
}

export interface StrictOption {
  value: string;
  label: string;
  disabled?: boolean;
  prefix?: ReactNode;
}

export type InputTimerFieldType =
  | {
      start: string;
      end: string;
    }
  | undefined;
