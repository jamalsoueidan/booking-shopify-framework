import { DropdownMultiSelectInput } from "@jamalsoueidan/bsf.components.inputs.dropdown-multi-select-input";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { Field } from "@shopify/react-form";
import React, { useMemo } from "react";

const locales = {
  da: {
    label: "Vælge dage",
  },
  en: {
    label: "Choose days",
  },
};

export interface SelectDaysInputProps {
  field: Field<string[]>;
  label?: string;
  placeholder?: string;
}

export const SelectDaysInput = (props: SelectDaysInputProps) => {
  const { t, locale } = useTranslation({ id: "select-days-input", locales });

  const options = useMemo(() => {
    return getDays().map((d) => {
      const value = titlize(
        d.toLocaleString(locale === "da" ? "da-DK" : "en-US", {
          weekday: "long",
        })
      );
      const label = value;
      return {
        value,
        label,
      };
    });
  }, [locale]);

  return (
    <DropdownMultiSelectInput options={options} label={t("label")} {...props} />
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
