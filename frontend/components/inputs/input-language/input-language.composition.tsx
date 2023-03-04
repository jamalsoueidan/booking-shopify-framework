import { PreviwApplication } from "@jamalsoueidan/bit-dev.preview.application";
import { useField } from "@shopify/react-form";
import React from "react";
import { InputLanguage } from "./input-language";

export const BasicLanguageInput = () => {
  const field = useField("");
  return (
    <PreviwApplication>
      <InputLanguage {...field} />
    </PreviwApplication>
  );
};

export const CustomLabelPlaceholderLanguageInput = () => {
  const field = useField("");
  return (
    <PreviwApplication>
      <InputLanguage label="speech" placeholder="hej" {...field} />
    </PreviwApplication>
  );
};

export const PreSelectValueLanguageInput = () => {
  const field = useField("da");
  return (
    <PreviwApplication>
      <InputLanguage {...field} />
    </PreviwApplication>
  );
};
