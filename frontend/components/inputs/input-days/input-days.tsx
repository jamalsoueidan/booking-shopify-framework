import { HelperText } from "@jamalsoueidan/frontend.helpers.helper-text";
import { useTranslation } from "@jamalsoueidan/frontend.hooks.use-translation";
import { Button, Labelled, LabelledProps } from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import React, { useCallback, useId, useMemo } from "react";

export interface InputDaysProps {
  input?: Partial<Omit<LabelledProps, "error">>;
  field: Field<string[]>;
}

export const InputDays = ({ input, field }: InputDaysProps) => {
  const id = useId();
  const { t, locale } = useTranslation({ id: "input-days", locales });

  const options = useMemo(
    () =>
      getDays().map((d) => {
        const label = HelperText.titlize(
          d.toLocaleString(locale === "da" ? "da-DK" : "en-US", {
            weekday: "long",
          }),
        );
        const value = d
          .toLocaleString("en-US", {
            weekday: "long",
          })
          .toLowerCase();

        return {
          label,
          value,
        };
      }),
    [locale],
  );

  const onClickDay = useCallback(
    (value: string) => {
      const values = field.value;
      if (values.includes(value)) {
        field.onChange(values.filter((v) => v !== value));
      } else {
        field.onChange([...values, value]);
      }
    },
    [field],
  );

  const daysMarkup = useMemo(
    () =>
      options.map((day) => (
        <Button
          size="slim"
          key={day.value}
          pressed={!!field.value?.find((p) => day.value === p)}
          onClick={() => onClickDay(day.value)}
        >
          {day.label}
        </Button>
      )),
    [field.value, onClickDay, options],
  );

  return (
    <Labelled
      {...input}
      label={input?.label || t("label")}
      error={field.error}
      id={`${id}-select-days-input`}
    >
      {daysMarkup}
    </Labelled>
  );
};

const getDays = (current = new Date(2017, 1, 27)) => {
  const week: Date[] = [];
  const first = current.getDate() - current.getDay() + 1;
  current.setDate(first);
  for (let i = 0; i < 7; i += 1) {
    week.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return week;
};

// TODO: should be removed to another location

const locales = {
  da: {
    label: "Vælge dage",
  },
  en: {
    label: "Choose days",
  },
};
