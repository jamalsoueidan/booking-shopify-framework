import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { Select } from "@shopify/polaris";
import React, { useMemo } from "react";
import { InputTimerModeProps } from "../input-timer.types";

export const InputTimerSelect = ({
  helpText,
  error,
  labelHidden,
  value,
  optionLabel,
  options,
  label,
  onChange,
}: InputTimerModeProps) => {
  const { t } = useTranslation({
    id: "input-timer-select",
    locales,
  });

  const modifiedOptions = useMemo(() => {
    if (!options || options.length === 0) {
      return [];
    }

    if (optionLabel) {
      options.unshift({
        label: optionLabel || "",
        value: "",
      });
    }

    return options;
  }, [optionLabel, options]);

  const labelFields = {
    error,
    helpText,
    label: label || t("label"),
    labelHidden,
  };

  return (
    <Select
      {...labelFields}
      disabled={!modifiedOptions || modifiedOptions.length === 0}
      options={modifiedOptions}
      value={value?.start}
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
