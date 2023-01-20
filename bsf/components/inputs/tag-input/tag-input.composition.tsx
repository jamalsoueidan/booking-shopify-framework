import React from "react";
import { TagInput } from "./tag-input";
import { useField } from "@shopify/react-form";
import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";

export const BasicTagInput = () => {
  const field = useField("");
  return (
    <ApplicationFramePage title="Tag input">
      <TagInput field={field} />
    </ApplicationFramePage>
  );
};
