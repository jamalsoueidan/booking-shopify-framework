import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { Card } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import { addHours, eachHourOfInterval, setHours } from "date-fns";
import React from "react";
import { InputTimer, InputTimerFieldType } from "./input-timer";

const result = eachHourOfInterval({
  start: setHours(new Date(), 8),
  end: setHours(new Date(), 14),
});

const mock = result.map((r) => ({
  start: r,
  end: addHours(r, 1),
  staff: {
    _id: "2",
    fullname: "jamal soueidan",
  },
}));

export const BasicInputTimer = () => {
  const field = useField<InputTimerFieldType>(undefined);

  return (
    <ApplicationFramePage>
      <Card title="no optionLabel" sectioned>
        <InputTimer data={mock} {...field} />
      </Card>
      <Card title="optionLabel" sectioned>
        <InputTimer data={mock} {...field} optionLabel="Vælge fra listen" />
      </Card>
      <div>
        <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
      </div>
    </ApplicationFramePage>
  );
};
