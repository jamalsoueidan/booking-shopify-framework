import { useTranslation } from "@jamalsoueidan/frontend.hooks.use-translation";
import { Autocomplete, SelectProps } from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";

const locales = {
  da: {
    label: "Tidszone",
    placeholder: "Vælge tidszone",
  },
  en: {
    label: "Timezone",
    placeholder: "Choose timezone",
  },
};

export interface InputTimeZoneProps
  extends Field<string>,
    Field<string>,
    Omit<SelectProps, "error" | "onBlur" | "onChange" | "value" | "label"> {
  label?: string;
  placeholder?: string;
}

export const InputTimeZone = memo((field: InputTimeZoneProps) => {
  const { t } = useTranslation({
    id: "input-time-zone",
    locales,
  });

  const deselectedOptions = useMemo(
    () =>
      timeZones.map((timeZone) => ({
        key: timeZone,
        label: timeZone,
        value: timeZone,
      })),
    [],
  );

  const [inputValue, setInputValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([field.value]);
  const [options, setOptions] = useState(deselectedOptions);

  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);
      const filterRegex = new RegExp(value, "i");
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex),
      );
      setOptions(resultOptions);
    },
    [deselectedOptions],
  );

  const updateSelection = useCallback(
    (selected: string[]) => {
      const selectedValue = selected.map((selectedItem: string) => {
        const matchedOption = options.find((option) =>
          option.value.match(selectedItem),
        );
        return matchedOption && matchedOption.label;
      });

      setSelectedOptions(selected);
      setInputValue(selectedValue[0] || "");
      field.onChange(selectedValue[0] || "");
    },
    [field, options],
  );

  useEffect(() => {
    if (!field.dirty) {
      setInputValue(field.value);
    }
  }, [field.dirty, field.value]);

  const textField = (
    <Autocomplete.TextField
      label={t("label")}
      placeholder={t("placeholder")}
      {...field}
      onChange={updateText}
      value={inputValue}
      autoComplete="false"
    />
  );

  return (
    <Autocomplete
      options={options}
      selected={selectedOptions}
      onSelect={updateSelection}
      textField={textField}
    />
  );
});

const timeZones = [
  "Europe/Amsterdam",
  "Europe/Andorra",
  "Europe/Astrakhan",
  "Europe/Athens",
  "Europe/Belgrade",
  "Europe/Berlin",
  "Europe/Brussels",
  "Europe/Bucharest",
  "Europe/Budapest",
  "Europe/Chisinau",
  "Europe/Copenhagen",
  "Europe/Dublin",
  "Europe/Gibraltar",
  "Europe/Helsinki",
  "Europe/Istanbul",
  "Europe/Kaliningrad",
  "Europe/Kiev",
  "Europe/Kirov",
  "Europe/Lisbon",
  "Europe/London",
  "Europe/Luxembourg",
  "Europe/Madrid",
  "Europe/Malta",
  "Europe/Minsk",
  "Europe/Monaco",
  "Europe/Moscow",
  "Europe/Oslo",
  "Europe/Paris",
  "Europe/Prague",
  "Europe/Riga",
  "Europe/Rome",
  "Europe/Samara",
  "Europe/Saratov",
  "Europe/Simferopol",
  "Europe/Sofia",
  "Europe/Stockholm",
  "Europe/Tallinn",
  "Europe/Tirane",
  "Europe/Ulyanovsk",
  "Europe/Uzhgorod",
  "Europe/Vienna",
  "Europe/Vilnius",
  "Europe/Volgograd",
  "Europe/Warsaw",
  "Europe/Zaporozhye",
  "Europe/Zurich",
];
