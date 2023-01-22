import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { Card, Text } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import { format } from "date-fns";
import React from "react";
import { DatePickerInput } from "./date-picker-input";

export const BasicDatePickerInput = () => {
  const field = useField(undefined);

  return (
    <ApplicationFramePage>
      <Card title="Normal mode" sectioned>
        <DatePickerInput label="Date" {...field} />
        <Text variant="bodyMd" as="p">
          {field.value ? format(field.value, "PPP") : ""}
        </Text>
      </Card>

      <Card title="Inline mode" sectioned>
        <DatePickerInput label="Date" mode="inline" {...field} />
        <Text variant="bodyMd" as="p">
          {field.value ? format(field.value, "PPP") : ""}
        </Text>
      </Card>
    </ApplicationFramePage>
  );
};
