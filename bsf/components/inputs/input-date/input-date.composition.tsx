import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { Card, Text } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import { addDays, eachDayOfInterval, format } from "date-fns";
import React from "react";
import { InputDate } from "./input-date";

export const Basic = () => {
  const field = useField(undefined);

  return (
    <ApplicationFramePage>
      <Card title="Normal mode" sectioned>
        <InputDate label="Date" {...field} />
        <Text variant="bodyMd" as="p">
          {field.value ? format(field.value, "PPP") : ""}
        </Text>
      </Card>
    </ApplicationFramePage>
  );
};

export const Inline = () => {
  const field = useField(undefined);

  return (
    <ApplicationFramePage>
      <Card title="Inline mode" sectioned>
        <InputDate label="Date" mode="inline" {...field} />
        <Text variant="bodyMd" as="p">
          {field.value ? format(field.value, "PPP") : ""}
        </Text>
      </Card>
    </ApplicationFramePage>
  );
};

const result = eachDayOfInterval({
  start: addDays(new Date(), 2),
  end: addDays(new Date(), 4),
});

const mock = result.map((r) => ({
  date: r,
  hours: [],
}));

export const WithData = () => {
  const field = useField(undefined);

  return (
    <ApplicationFramePage>
      <Card title="Inline mode with data" sectioned>
        <InputDate label="Date" mode="inline" data={mock} {...field} />
        <Text variant="bodyMd" as="p">
          {field.value ? format(field.value, "PPP") : ""}
        </Text>
      </Card>
    </ApplicationFramePage>
  );
};
