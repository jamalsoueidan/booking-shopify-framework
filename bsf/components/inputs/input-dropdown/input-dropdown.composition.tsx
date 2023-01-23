import React, { useMemo } from "react";
import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { InputDropdown } from "./input-dropdown";
import { useField } from "@shopify/react-form";

export const BasicInputDropdown = () => {
  const options = useMemo(
    () => [
      { value: "jamal", label: "Jamal" },
      { value: "sara", label: "Sara" },
    ],
    []
  );

  const field = useField<string[]>([]);

  return (
    <ApplicationFramePage title="Dropdown multi select input">
      <InputDropdown
        field={field}
        options={options}
        label="User list"
        placeholder="Click and pick a user"
      />
    </ApplicationFramePage>
  );
};
