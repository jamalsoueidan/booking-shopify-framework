import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { AlphaStack, Button, Columns, Inline, InlineError, Labelled, Text } from "@shopify/polaris";
import { format, setHours } from "date-fns";
import React, { memo } from "react";
import { InputTimerModeProps, OnChangeFunc, StrictOption } from "../input-timer.types";

export const InputTimerList = ({
  options,
  label,
  helpText,
  onChange,
  value,
  error,
  labelHidden,
}: InputTimerModeProps) => {
  const { t } = useTranslation({ id: "input-timer-list", locales });

  const labelFields = {
    error,
    helpText,
    label: label || t("label"),
    labelHidden,
  };

  const morning = options?.filter((f) => parseInt(format(new Date(f.value), "k"), 2) < 12) || [];

  const afternoon =
    options?.filter((f) => {
      const hour = parseInt(format(new Date(f.value), "k"), 2);
      return hour > 12 && hour < 18;
    }) || [];

  const evening =
    options?.filter((f) => {
      const hour = parseInt(format(new Date(f.value), "k"), 2);
      return hour > 18;
    }) || [];

  return (
    <Labelled id="input-timer" {...labelFields}>
      {options?.length === 0 ? (
        t("empty")
      ) : (
        <Columns columns={{ sm: 3, xs: 1 }}>
          <ColumnPeriod date={setHours(new Date(), 11)} hours={morning} onChange={onChange} selected={value?.start} />
          <ColumnPeriod date={setHours(new Date(), 13)} hours={afternoon} onChange={onChange} selected={value?.start} />
          <ColumnPeriod date={setHours(new Date(), 19)} hours={evening} onChange={onChange} selected={value?.start} />
        </Columns>
      )}
      {error && <InlineError message={error} fieldID="myFieldID" />}
    </Labelled>
  );
};

interface ColumnPeriodProps {
  date: Date;
  hours: StrictOption[];
  onChange?: OnChangeFunc;
  selected?: string;
}

const ColumnPeriod = memo(({ date, hours, onChange, selected }: ColumnPeriodProps) => {
  const { t } = useTranslation({
    id: "column-period",
    locales: {
      da: {
        ...locales.da.inline,
      },
      en: {
        ...locales.en.inline,
      },
    },
  });

  return (
    <AlphaStack gap="1" fullWidth>
      <Text variant="headingSm" as="p" alignment="center">
        {format(date, "B")}
      </Text>
      {hours.length === 0 ? (
        <Text variant="bodyMd" as="span" alignment="center">
          {t("empty")}
        </Text>
      ) : (
        hours.map((m) => (
          <InlineButtonHour
            key={m.value}
            onClick={() => onChange && onChange(m.value)}
            label={m.label}
            pressed={m.value === selected}
          />
        ))
      )}
    </AlphaStack>
  );
});

interface InlineButtonHourProps {
  label: string;
  onClick: () => void;
  pressed: boolean;
}

const InlineButtonHour = memo(({ label, onClick, pressed }: InlineButtonHourProps) => (
  <Inline align="center">
    <Button size="slim" onClick={onClick} pressed={pressed}>
      {label}
    </Button>
  </Inline>
));

const locales = {
  da: {
    empty: "Der findes ingen tidspunkter",
    inline: {
      empty: "Ingen tidspunkter",
    },
    label: "Vælg tid",
  },
  en: {
    empty: "There is no time available",
    inline: {
      empty: "No time",
    },
    label: "Choose time",
  },
};
