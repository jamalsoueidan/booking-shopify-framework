import React from "react";
import { SelectDaysInput } from "./select-days-input";
import { useField } from "@shopify/react-form";
import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";

export const BasicSelectDaysInput = () => {
  const field = useField<string[]>([]);
  return (
    <ApplicationFramePage title="Select days input">
      <SelectDaysInput field={field} />
    </ApplicationFramePage>
  );
};
