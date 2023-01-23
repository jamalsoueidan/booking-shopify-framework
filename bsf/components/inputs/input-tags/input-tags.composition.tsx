import React from "react";
import { InputTags } from "./input-tags";
import { useField } from "@shopify/react-form";
import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";

export const BasicTagInput = () => {
  const field = useField("");
  return (
    <ApplicationFramePage title="Tag input">
      <InputTags field={field} />
    </ApplicationFramePage>
  );
};
