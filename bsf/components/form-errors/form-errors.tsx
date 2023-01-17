import React from "react";
import { Banner } from "@shopify/polaris";
import { FormError } from "@shopify/react-form";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";

export interface FormErrorsProps {
  errors?: FormError[];
}

const locales = [
  {
    error: "Fejl",
  },
  {
    error: "Error",
  },
];

export const FormErrors = ({ errors }: FormErrorsProps) => {
  const { t } = useTranslation({
    id: "inject",
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
