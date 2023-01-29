import { SelectProps } from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import { ReactNode } from "react";

export type OnChangeFunc = (selected: string) => void;

export interface InputTimerModeProps
  extends Omit<Field<InputTimerFieldType>, "onChange">,
    Partial<Pick<SelectProps, "label" | "helpText" | "labelHidden">> {
  options?: StrictOption[];
  optionLabel?: string;
  onChange?: OnChangeFunc;
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
