import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import { Card } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import React, { useMemo } from "react";
import { InputMultiSelect, InputMultiSelectField } from "./input-multi-select";

export const BasicInputDropdown = withApplication(
  () => {
    const options = useMemo(
      () => [
        { label: "Jamal", value: "jamal" },
        { label: "Sara", value: "sara" },
      ],
      [],
    );

    const field = useField<InputMultiSelectField>(undefined);

    return (
      <Card sectioned>
        <InputMultiSelect
          field={field}
          options={options}
          input={{ label: "User list", placeholder: "Click and pick a user" }}
        />
      </Card>
    );
  },
  { pageTitle: "Multi select input" },
);
