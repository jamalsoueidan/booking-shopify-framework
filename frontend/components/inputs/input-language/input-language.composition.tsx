import { withApplicationCard } from "@jamalsoueidan/bit-dev.preview.with-application";
import { useField } from "@shopify/react-form";
import React from "react";
import { InputLanguage } from "./input-language";

export const BasicLanguageInput = withApplicationCard(() => {
  const field = useField("");
  return <InputLanguage {...field} />;
});

export const CustomLabelPlaceholderLanguageInput = withApplicationCard(() => {
  const field = useField("");
  return <InputLanguage label="speech" placeholder="hej" {...field} />;
});

export const PreSelectValueLanguageInput = withApplicationCard(() => {
  const field = useField("da");
  return <InputLanguage {...field} />;
});
