import { WidgetHour } from "@jamalsoueidan/bsb.mongodb.types";
import { Text } from "@jamalsoueidan/bsf.helpers.text";
import { useDate } from "@jamalsoueidan/bsf.hooks.use-date";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { Select, SelectOption, SelectProps } from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import { format } from "date-fns";
import React, { useCallback, useMemo } from "react";

export type InputTimerFieldType =
  | {
      start: Date;
      end: Date;
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
      return;
    }

    const hours: Array<SelectOption> =
      [...data].sort(Text.sortByDateKey("start")).map((t) => ({
        key: t.start.toISOString(),
        label:
          format(toTimeZone(t.start), "p") +
          " - " +
          format(toTimeZone(t.end), "p"),
        value: t.start.toJSON(),
      })) || [];

    if (optionLabel) {
      hours.unshift(defaultOption);
    }

    return hours;
  }, [data]);

  const onChange = useCallback(
    (selected: string) => {
      const selectedHour = data?.find((t) => t.start.toJSON() === selected);

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

  return (
    <Select
      {...field}
      label={field?.label || t("label")}
      options={timeOptions}
      value={field.value?.start?.toISOString()}
      disabled={!timeOptions || timeOptions.length <= 1}
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
