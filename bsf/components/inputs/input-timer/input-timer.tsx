import { WidgetHourRange } from "@jamalsoueidan/bsb.mongodb.types";
import { Text as HelperText } from "@jamalsoueidan/bsf.helpers.text";
import { useDate } from "@jamalsoueidan/bsf.hooks.use-date";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import {
  AlphaStack,
  Button,
  Columns,
  Inline,
  InlineError,
  Labelled,
  Select,
  SelectOption,
  SelectProps,
  Text,
} from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import { format, setHours } from "date-fns";
import React, { memo, useCallback, useEffect, useMemo } from "react";

interface StrictOption {
  value: string;
  label: string;
  disabled?: boolean;
  prefix?: React.ReactNode;
}

export type InputTimerFieldType =
  | {
      start: string;
      end: string;
    }
  | undefined;

export interface InputTimerProps
  extends Field<InputTimerFieldType>,
    Partial<Omit<SelectProps, "onChange" | "error" | "onBlur" | "value">> {
  data?: WidgetHourRange[];
  optionLabel?: string;
  mode?: "inline";
}

export const InputTimer = ({
  data,
  optionLabel,
  mode,
  label,
  ...field
}: InputTimerProps) => {
  const { toTimeZone } = useDate();
  const { t, locale } = useTranslation({ id: "input-timer", locales });

  const defaultOption = {
    key: optionLabel || "",
    label: optionLabel || "",
    value: "",
  } as any;

  const timeOptions = useMemo(() => {
    if (!data) {
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

    if (optionLabel) {
      hours.unshift(defaultOption);
    }

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

  const labelFields = {
    label: label || t("label"),
    helpText: field.helpText,
    error: field.error,
    labelHidden: field.labelHidden,
  };

  if (!mode) {
    return (
      <Select
        {...field}
        {...labelFields}
        options={timeOptions}
        value={field.value?.start}
        disabled={timeOptions.length === 0}
        onChange={onChange}
      />
    );
  }

  const morning = timeOptions?.filter(
    (f) => parseInt(format(new Date(f.value), "k")) < 12
  );

  const afternoon = timeOptions?.filter((f) => {
    const hour = parseInt(format(new Date(f.value), "k"));
    return hour > 12 && hour < 18;
  });

  const evening = timeOptions?.filter((f) => {
    const hour = parseInt(format(new Date(f.value), "k"));
    return hour > 18;
  });

  return (
    <Labelled id="input-timer" {...labelFields}>
      <Columns columns={{ xs: 1, sm: 3 }}>
        <ColumnPeriod
          date={setHours(new Date(), 11)}
          hours={morning}
          onChange={onChange}
          selected={field.value?.start}
        />
        <ColumnPeriod
          date={setHours(new Date(), 13)}
          hours={afternoon}
          onChange={onChange}
          selected={field.value?.start}
        />
        <ColumnPeriod
          date={setHours(new Date(), 19)}
          hours={evening}
          onChange={onChange}
          selected={field.value?.start}
        />
      </Columns>
      {field.error && <InlineError message={field.error} fieldID="myFieldID" />}
    </Labelled>
  );
};

interface ColumnPeriod {
  date: Date;
  hours: StrictOption[];
  onChange: (value: string) => void;
  selected?: string;
}

const ColumnPeriod = memo(
  ({ date, hours, onChange, selected }: ColumnPeriod) => (
    <AlphaStack gap="1" fullWidth>
      <Text variant="headingSm" as="p" alignment="center">
        {format(date, "B")}
      </Text>
      {hours.map((m) => (
        <InlineButtonHour
          key={m.value}
          onClick={() => onChange(m.value)}
          label={m.label}
          pressed={m.value === selected}
        />
      ))}
    </AlphaStack>
  )
);

const InlineButtonHour = memo(({ label, onClick, pressed }: any) => (
  <Inline align="center">
    <Button size="slim" outline onClick={onClick} pressed={pressed}>
      {label}
    </Button>
  </Inline>
));

const locales = {
  da: {
    label: "Vælg tid",
  },
  en: {
    label: "Choose time",
  },
};
