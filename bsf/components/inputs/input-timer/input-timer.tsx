import { WidgetSchedule } from "@jamalsoueidan/bsb.mongodb.types";
import { useDate } from "@jamalsoueidan/bsf.hooks.use-date";
import { Text } from "@jamalsoueidan/bsf.helpers.text";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { Select, SelectProps } from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import { format } from "date-fns";
import React, { useCallback, useMemo } from "react";

export type FieldType = { start: string; end: string };

export interface InputTimerProps
  extends Field<FieldType>,
    Partial<Omit<SelectProps, "onChange" | "error" | "onBlur" | "value">> {
  data?: WidgetSchedule;
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
    const hours: Array<{ label: string; value: string }> =
      data?.hours.map((t) => ({
        key: t.start,
        label:
          format(toTimeZone(t.start), "p") +
          " - " +
          format(toTimeZone(t.end), "p"),
        value: t.start,
      })) || [];

    hours.sort(Text.sortByDate);

    if (optionLabel) {
      hours.unshift(defaultOption);
    }

    return hours;
  }, [data]);

  const onChange = useCallback(
    (selected: string) => {
      const selectedHour = data?.hours.find((t) => t.start === selected);
      if (!selectedHour) {
        return;
      }

      field.onChange({
        start: selectedHour.start,
        end: selectedHour.end,
      });
    },
    [field.onChange, data]
  );

  return (
    <Select
      {...field}
      label={field?.label || t("label")}
      options={timeOptions}
      value={field.value?.start}
      disabled={timeOptions.length <= 1}
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
