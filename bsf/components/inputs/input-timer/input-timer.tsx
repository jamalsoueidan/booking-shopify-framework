import { WidgetHour } from "@jamalsoueidan/bsb.mongodb.types";
import { Text } from "@jamalsoueidan/bsf.helpers.text";
import { useDate } from "@jamalsoueidan/bsf.hooks.use-date";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { Select, SelectOption, SelectProps } from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import { format } from "date-fns";
import React, { useCallback, useEffect, useMemo } from "react";

export type InputTimerFieldType =
  | {
      start: string;
      end: string;
    }
  | undefined;

export interface InputTimerProps
  extends Field<InputTimerFieldType>,
    Partial<Omit<SelectProps, "onChange" | "error" | "onBlur" | "value">> {
  data?: WidgetHour[];
  optionLabel?: string;
}

export const InputTimer = ({
  data,
  optionLabel,
  ...field
}: InputTimerProps) => {
  const { toTimeZone } = useDate();
  const { t } = useTranslation({ id: "input-timer", locales });

  const defaultOption = {
    key: optionLabel || "",
    label: optionLabel || "",
    value: "",
  } as any;

  const timeOptions = useMemo(() => {
    if (!data) {
      return [];
    }

    const hours: Array<SelectOption> =
      [...data].sort(Text.sortByDateKey("start")).map((t) => ({
        key: t.start,
        label:
          format(toTimeZone(t.start), "p") +
          " - " +
          format(toTimeZone(t.end), "p"),
        value: t.start,
      })) || [];

    if (optionLabel) {
      hours.unshift(defaultOption);
    }

    return hours;
  }, [data]);

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

  const dispatchOnChangeNoOptionLabel = useCallback(() => {
    if (optionLabel || !timeOptions) {
      return;
    }

    if (timeOptions?.length > 0 && !field.value) {
      const option = timeOptions[0] as any;
      onChange(option.value);
    }
  }, [optionLabel, timeOptions, field.value, onChange]);

  useEffect(dispatchOnChangeNoOptionLabel, []);
  useEffect(dispatchOnChangeNoOptionLabel, [timeOptions]);

  return (
    <Select
      {...field}
      label={field?.label || t("label")}
      options={timeOptions}
      value={field.value?.start}
      disabled={timeOptions.length === 0}
      onChange={onChange}
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
