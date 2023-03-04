import { PreviwApplication } from "@jamalsoueidan/bit-dev.preview.application";
import { Card, Select } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import { addHours, eachHourOfInterval, setHours } from "date-fns";
import React from "react";
import { UseTimerField, UseTimerProps, useTimer } from "./use-timer";

const InputTimerDrop = ({ data, field }: UseTimerProps) => {
  const { options, onChange } = useTimer({
    data,
    field,
  });

  return (
    <Select
      labelHidden
      label="-"
      options={options}
      onChange={onChange}
      value={field.value?.start.toJSON()}
    />
  );
};

export const Basic = () => {
  const field = useField<UseTimerField>(undefined);

  return (
    <PreviwApplication>
      <Card sectioned>
        <InputTimerDrop field={field} data={mock} />
      </Card>
      <div>
        <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
      </div>
    </PreviwApplication>
  );
};

const result = eachHourOfInterval({
  end: setHours(new Date(), 21),
  start: setHours(new Date(), 8),
});

const mock = result.map((r) => ({
  end: addHours(r, 1),
  start: r,
}));
