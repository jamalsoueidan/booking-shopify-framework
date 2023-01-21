import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { Button, Labelled, LabelledProps } from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import React, { useCallback, useId, useMemo } from "react";

export interface SelectDaysInputProps
  extends Partial<Omit<LabelledProps, "error">>,
    Field<string[]> {
  placeholder?: string;
}

export const SelectDaysInput = ({
  label,
  helpText,
  requiredIndicator,
  ...rest
}: SelectDaysInputProps) => {
  const id = useId();
  const { t, locale } = useTranslation({ id: "select-days-input", locales });

  const options = useMemo(() => {
    return getDays().map((d) => {
      const label = titlize(
        d.toLocaleString(locale === "da" ? "da-DK" : "en-US", {
          weekday: "long",
        })
      );
      const value = label.toLocaleLowerCase();

      return {
        value,
        label,
      };
    });
  }, [locale]);

  const onPressed = useCallback(
    (value: string) => {
      const values = rest.value;
      if (values.includes(value)) {
        rest.onChange(values.filter((v) => v !== value));
      } else {
        rest.onChange([...values, value]);
      }
    },
    [rest]
  );

  return (
    <Labelled
      label={label || t("label")}
      error={rest.error}
      helpText={helpText}
      requiredIndicator={requiredIndicator || false}
      id={id + "select-days-input"}
    >
      {options.map((day) => (
        <Button
          size="slim"
          key={day.value}
          pressed={rest.value.includes(day.value.toLowerCase())}
          onClick={() => onPressed(day.value)}
        >
          {day.label}
        </Button>
      ))}
    </Labelled>
  );
};

const getDays = (current = new Date(2017, 1, 27)) => {
  var week: Date[] = [];
  var first = current.getDate() - current.getDay() + 1;
  current.setDate(first);
  for (var i = 0; i < 7; i++) {
    week.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return week;
};

// TODO: should be removed to another location
const titlize = (string: string) => {
  return string
    .toLowerCase()
    .split(" ")
    .map((word) => word.replace(word[0], word[0].toUpperCase()))
    .join("");
};

const locales = {
  da: {
    label: "Vælge dage",
  },
  en: {
    label: "Choose days",
  },
};
