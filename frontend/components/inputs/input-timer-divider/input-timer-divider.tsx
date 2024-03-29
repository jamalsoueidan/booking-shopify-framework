import { WidgetHourRange } from "@jamalsoueidan/backend.types.widget";
import { useDate } from "@jamalsoueidan/frontend.hooks.use-date";
import {
  UseTimerField,
  UseTimerInput,
  UseTimerOption,
  useTimer,
} from "@jamalsoueidan/frontend.hooks.use-timer";
import { useTranslation } from "@jamalsoueidan/frontend.hooks.use-translation";
import {
  AlphaStack,
  Button,
  Columns,
  Inline,
  Labelled,
  Text,
} from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import { isEqual, setHours } from "date-fns";
import React, { memo } from "react";

export type InputTimerDividerField = UseTimerField;
export interface InputTimerDividerProps {
  field: Field<UseTimerField>;
  data?: WidgetHourRange[];
  input?: Omit<UseTimerInput, "placeholder">;
}

export const InputTimerDivider = ({
  data,
  field,
  input,
}: InputTimerDividerProps) => {
  const { formatInTimezone } = useDate();
  const { options, onChange } = useTimer({
    autoSelectFirst: false,
    data,
    field,
  });

  const { t } = useTranslation({ id: "input-timer-divider", locales });

  const morning =
    options?.filter(
      (f) => parseInt(formatInTimezone(new Date(f.value), "k"), 10) < 12,
    ) || [];

  const afternoon =
    options?.filter((f) => {
      const hour = parseInt(formatInTimezone(new Date(f.value), "k"), 10);
      return hour > 12 && hour < 18;
    }) || [];

  const evening =
    options?.filter((f) => {
      const hour = parseInt(formatInTimezone(new Date(f.value), "k"), 10);
      return hour > 18;
    }) || [];

  const isDisabled = input?.disabled || options?.length === 0;

  return (
    <Labelled
      id="input-timer"
      label={input?.label || t("label")}
      {...input}
      error={!isDisabled ? field.error : undefined}
    >
      {options?.length === 0 ? (
        <Text
          variant="bodyMd"
          as="p"
          color={isDisabled ? "subdued" : undefined}
        >
          {t("empty")}
        </Text>
      ) : (
        <Columns columns={{ sm: 3, xs: 1 }}>
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
      )}
    </Labelled>
  );
};

interface ColumnPeriodProps {
  date: Date;
  hours: UseTimerOption[];
  onChange?: (selected: string, id: string) => void;
  selected?: Date;
}

const ColumnPeriod = memo(
  ({ date, hours, onChange, selected }: ColumnPeriodProps) => {
    const { formatInTimezone } = useDate();
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
      <AlphaStack gap="1">
        <Text variant="headingSm" as="p" alignment="center">
          {formatInTimezone(date, "B")}
        </Text>
        {hours.length === 0 ? (
          <Text variant="bodyMd" as="span" alignment="center">
            {t("empty")}
          </Text>
        ) : (
          hours.map((m) => (
            <InlineButtonHour
              key={m.value}
              onClick={() => onChange && onChange(m.value, m.label)}
              label={m.label}
              pressed={isEqual(new Date(m.value), selected || new Date())}
            />
          ))
        )}
      </AlphaStack>
    );
  },
);

interface InlineButtonHourProps {
  label: string;
  onClick: () => void;
  pressed: boolean;
}

const InlineButtonHour = memo(
  ({ label, onClick, pressed }: InlineButtonHourProps) => (
    <Inline align="center">
      <Button size="slim" onClick={onClick} pressed={pressed}>
        {label}
      </Button>
    </Inline>
  ),
);

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
