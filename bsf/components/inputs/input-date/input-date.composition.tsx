import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { Card, Text } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import { format } from "date-fns";
import React from "react";
import { InputDate } from "./input-date";

export const BasicInputDate = () => {
  const field = useField(undefined);

  return (
    <ApplicationFramePage>
      <Card title="Normal mode" sectioned>
        <InputDate label="Date" {...field} />
        <Text variant="bodyMd" as="p">
          {field.value ? format(field.value, "PPP") : ""}
        </Text>
      </Card>

      <Card title="Inline mode" sectioned>
        <InputDate label="Date" mode="inline" {...field} />
        <Text variant="bodyMd" as="p">
          {field.value ? format(field.value, "PPP") : ""}
        </Text>
      </Card>
    </ApplicationFramePage>
  );
};
