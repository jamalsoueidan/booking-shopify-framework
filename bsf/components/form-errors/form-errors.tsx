import React from "react";
import { Banner } from "@shopify/polaris";
import { FormError } from "@shopify/react-form";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";

const locales = {
  da: {
    error: "Fejl",
  },
  en: {
    error: "Error",
  },
};

export interface FormErrorsProps {
  errors?: FormError[];
}

export const FormErrors = ({ errors }: FormErrorsProps) => {
  const { t } = useTranslation({
    id: "form-errors",
    locales,
  });

  if (errors && errors.length > 0) {
    return (
      <Banner status="critical">
        <p>{t("error")}:</p>
        <ul>
          {errors.map(({ message }, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </Banner>
    );
  }

  return <></>;
};
