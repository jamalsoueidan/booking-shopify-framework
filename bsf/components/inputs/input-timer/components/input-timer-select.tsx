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

  const defaultOption = {
    key: optionLabel || "",
    label: optionLabel || "",
    value: "",
  } as any;

  const modifiedOptions = useMemo(() => {
    if (!options || options.length === 0) {
      return [];
    }

    if (optionLabel) {
      options.unshift(defaultOption);
    }

    return options;
  }, [options]);

  const labelFields = {
    label: label || t("label"),
    helpText,
    error,
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
