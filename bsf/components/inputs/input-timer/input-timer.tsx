import { WidgetHourRange } from "@jamalsoueidan/bsb.mongodb.types";
import { Text as HelperText } from "@jamalsoueidan/bsf.helpers.text";
import { useDate } from "@jamalsoueidan/bsf.hooks.use-date";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { SelectProps } from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import { format } from "date-fns";
import React, { useCallback, useEffect, useMemo } from "react";
import { InputTimerList } from "./components/input-timer-list";
import { InputTimerSelect } from "./components/input-timer-select";
import { InputTimerFieldType, StrictOption } from "./input-timer.types";

const modeTypes = {
  list: InputTimerList,
  select: InputTimerSelect,
};

export interface InputTimerProps
  extends Field<InputTimerFieldType>,
    Partial<Omit<SelectProps, "onChange" | "error" | "onBlur" | "value">> {
  data?: WidgetHourRange[];
  optionLabel?: string;
  mode?: "select" | "list";
}

export const InputTimer = ({
  data,
  optionLabel,
  mode = "select",
  label,
  ...field
}: InputTimerProps) => {
  const { toTimeZone } = useDate();
  const { locale } = useTranslation({
    id: "input-timer",
    locales: { da: {}, en: {} },
  });

  const options = useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }

    const hours: Array<StrictOption> =
      [...data].sort(HelperText.sortByDateKey("start")).map((t) => ({
        key: t.start,
        label:
          format(toTimeZone(t.start), "p") +
          " - " +
          format(toTimeZone(t.end), "p"),
        value: t.start,
      })) || [];

    return hours;
  }, [data, locale]);

  const onChange = useCallback(
    (selected: string) => {
      const selectedHour = data?.find((t) => t.start === selected);

      if (!selectedHour) {
        field.onChange(undefined);
      } else {
        field.onChange({
          start: selectedHour.start,
          end: selectedHour.end,
        });
      }
    },
    [field.onChange, data]
  );

  const dispatchChangeOnRenderNoOptionLabel = useCallback(() => {
    if (optionLabel || !options) {
      return;
    }

    if (options?.length > 0 && !field.value) {
      const option = options[0] as any;
      onChange(option.value);
    }
  }, [optionLabel, options, field.value, onChange]);

  useEffect(dispatchChangeOnRenderNoOptionLabel, []);
  useEffect(dispatchChangeOnRenderNoOptionLabel, [options]);

  const Component = modeTypes[mode] || InputTimerSelect;

  return (
    <Component
      {...field}
      onChange={onChange}
      optionLabel={optionLabel}
      options={options}
      value={field.value}
    />
  );
};
