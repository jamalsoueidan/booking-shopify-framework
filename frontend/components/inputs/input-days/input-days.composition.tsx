import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import { useField } from "@shopify/react-form";
import React from "react";
import { InputDays } from "./input-days";

export const Basic = withApplication(
  () => {
    const field = useField<string[]>([]);
    return (
      <>
        <InputDays field={field} />
        <div>
          <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
        </div>
      </>
    );
  },
  { title: "Select days input" },
);
