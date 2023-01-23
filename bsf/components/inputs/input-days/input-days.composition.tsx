import React from "react";
import { InputDays } from "./input-days";
import { useField } from "@shopify/react-form";
import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";

export const BasicInputDays = () => {
  const field = useField<string[]>([]);
  return (
    <ApplicationFramePage title="Select days input">
      <InputDays {...field} />
    </ApplicationFramePage>
  );
};
