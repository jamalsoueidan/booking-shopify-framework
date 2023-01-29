import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { Card, Select } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import { addHours, eachHourOfInterval, setHours } from "date-fns";
import React from "react";
import { WithTimerFieldType, withTimer } from "./with-timer";

export const BasicInputTimer = () => {
  const field = useField<WithTimerFieldType>(undefined);

  return (
    <ApplicationFramePage>
      <Card title="no optionLabel" sectioned>
        <InputTimer
          data={mock}
          field={field}
          input={{ label: "choose something", options: [{ label: "test", value: "test" }] }}
        />
      </Card>
      <div>
        <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
      </div>
    </ApplicationFramePage>
  );
};

const InputTimer = withTimer(({ input, field }) => (
  <Select options={input?.options} label={input?.label} {...input} value={field.value?.start} />
));

const result = eachHourOfInterval({
  end: setHours(new Date(), 21),
  start: setHours(new Date(), 8),
});

const mock = result.map((r) => ({
  end: addHours(r, 1).toJSON(),
  start: r.toJSON(),
}));
