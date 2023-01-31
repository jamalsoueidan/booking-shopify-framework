import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { useField } from "@shopify/react-form";
import React from "react";
import { InputTags } from "./input-tags";

export const BasicTagInput = () => {
  const field = useField("");
  return (
    <ApplicationFramePage title="Tag input">
      <InputTags field={field} />
    </ApplicationFramePage>
  );
};
