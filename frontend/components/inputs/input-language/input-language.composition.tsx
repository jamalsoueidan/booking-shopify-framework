import { ApplicationFramePage } from "@jamalsoueidan/bit-dev.preview.application";
import { useField } from "@shopify/react-form";
import React from "react";
import { InputLanguage } from "./input-language";

export const BasicLanguageInput = () => {
  const field = useField("");
  return (
    <ApplicationFramePage>
      <InputLanguage {...field} />
    </ApplicationFramePage>
  );
};

export const CustomLabelPlaceholderLanguageInput = () => {
  const field = useField("");
  return (
    <ApplicationFramePage>
      <InputLanguage label="speech" placeholder="hej" {...field} />
    </ApplicationFramePage>
  );
};

export const PreSelectValueLanguageInput = () => {
  const field = useField("da");
  return (
    <ApplicationFramePage>
      <InputLanguage {...field} />
    </ApplicationFramePage>
  );
};
