import { WidgetHourRange } from "@jamalsoueidan/bsb.types.widget";
import {
  UseTimerField,
  UseTimerInput,
  useTimer,
} from "@jamalsoueidan/bsf.hooks.use-timer";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { Select } from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import React from "react";

export type InputTimerDropField = UseTimerField;
export interface InputTimerDropProps {
  field: Field<UseTimerField>;
  data?: WidgetHourRange[];
  input?: UseTimerInput;
}

export const InputTimerDrop = ({ data, input, field }: InputTimerDropProps) => {
  const { options, onChange } = useTimer({
    autoSelectFirst: !input?.placeholder,
    data,
    field,
  });

  const { t } = useTranslation({
    id: "input-timer-select",
    locales,
  });

  return (
    <Select
      label={input?.label || t("label")}
      disabled={!data}
      {...field}
      {...input}
      options={options}
      onChange={onChange}
      value={field.value?.start.toJSON()}
    />
  );
};

const locales = {
  da: {
    label: "Vælg tid",
  },
  en: {
    label: "Choose time",
  },
};
