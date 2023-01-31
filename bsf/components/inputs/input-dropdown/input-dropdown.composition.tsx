import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { useField } from "@shopify/react-form";
import React, { useMemo } from "react";
import { InputDropdown, InputDropdownField } from "./input-dropdown";

export const BasicInputDropdown = () => {
  const options = useMemo(
    () => [
      { label: "Jamal", value: "jamal" },
      { label: "Sara", value: "sara" },
    ],
    [],
  );

  const field = useField<InputDropdownField>(undefined);

  return (
    <ApplicationFramePage title="Dropdown multi select input">
      <InputDropdown
        field={field}
        options={options}
        input={{ label: "User list", placeholder: "Click and pick a user" }}
      />
    </ApplicationFramePage>
  );
};
