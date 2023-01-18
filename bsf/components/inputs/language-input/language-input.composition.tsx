import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { useField } from "@shopify/react-form";
import React from "react";
import { LanguageInput } from "./language-input";

export const BasicLanguageInput = () => {
  const field = useField("");
  return (
    <ApplicationFramePage>
      <LanguageInput {...field} />
    </ApplicationFramePage>
  );
};

export const CustomLabelPlaceholderLanguageInput = () => {
  const field = useField("");
  return (
    <ApplicationFramePage>
      <LanguageInput label="speech" placeholder="hej" {...field} />
    </ApplicationFramePage>
  );
};

export const PreSelectValueLanguageInput = () => {
  const field = useField("da");
  return (
    <ApplicationFramePage>
      <LanguageInput {...field} />
    </ApplicationFramePage>
  );
};
