import { ApplicationFramePage } from "@jamalsoueidan/bit-dev.preview.application";
import { useField } from "@shopify/react-form";
import React from "react";
import { InputDays } from "./input-days";

export const BasicInputDays = () => {
  const field = useField<string[]>([]);
  return (
    <ApplicationFramePage title="Select days input">
      <InputDays field={field} />
      <div>
        <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
      </div>
    </ApplicationFramePage>
  );
};
