import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { Select, SelectProps } from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import React, { useMemo } from "react";

export interface InputLanguageProps
  extends Field<string>,
    Omit<SelectProps, "error" | "onBlur" | "onChange" | "value" | "label"> {
  label?: string;
  placeholder?: string;
}

export const InputLanguage = (field: InputLanguageProps) => {
  const { t } = useTranslation({
    id: "language-input",
    locales,
  });

  const languageOptions = useMemo(
    () => [
      {
        label: t("languages.danish"),
        value: "da",
      },
      {
        label: t("languages.english"),
        value: "en",
      },
    ],
    [t]
  );

  return (
    <Select
      label={t("label")}
      placeholder={t("placeholder")}
      options={languageOptions}
      {...field}
    />
  );
};

const locales = {
  da: {
    label: "Sprog",
    placeholder: "Vælge sprog",
    languages: {
      danish: "Dansk",
      english: "Engelsk",
    },
  },
  en: {
    label: "Language",
    placeholder: "Choose language",
    languages: {
      danish: "Danish",
      english: "English",
    },
  },
};