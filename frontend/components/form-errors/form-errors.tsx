import { useTranslation } from "@jamalsoueidan/frontend.hooks.use-translation";
import { Banner } from "@shopify/polaris";
import { FormError } from "@shopify/react-form";
import React from "react";

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
          {errors.map(({ message }) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      </Banner>
    );
  }

  return <></>;
};
