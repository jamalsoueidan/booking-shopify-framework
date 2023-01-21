import React from "react";
import { DatePickerInput } from "./date-picker-input";
import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { useField } from "@shopify/react-form";
import { Text } from "@shopify/polaris";
import { useDate } from "@jamalsoueidan/bsf.hooks.use-date";

export const BasicDatePickerInput = () => {
  const { format } = useDate();
  const field = useField(undefined);

  return (
    <ApplicationFramePage>
      <DatePickerInput label="Date" {...field} />
      <Text variant="bodyMd" as="p">
        {field.value ? format(field.value, "PPP") : ""}
      </Text>
    </ApplicationFramePage>
  );
};
