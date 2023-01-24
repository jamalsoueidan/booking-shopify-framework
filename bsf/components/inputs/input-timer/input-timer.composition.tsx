import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { Card } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import { addHours, eachHourOfInterval, setHours } from "date-fns";
import React from "react";
import { InputTimer, InputTimerFieldType } from "./input-timer";

export const BasicInputTimer = () => {
  const field = useField<InputTimerFieldType>(undefined);

  return (
    <ApplicationFramePage>
      <Card title="no optionLabel" sectioned>
        <InputTimer data={mock} {...field} />
      </Card>
      <div>
        <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
      </div>
    </ApplicationFramePage>
  );
};

export const Inline = () => {
  const field = useField<InputTimerFieldType>(undefined);

  return (
    <ApplicationFramePage>
      <Card title="optionLabel" sectioned>
        <InputTimer data={mock} {...field} mode="inline" />
      </Card>
      <Card title="Some hours" sectioned>
        <InputTimer data={mock.slice(5)} {...field} mode="inline" />
      </Card>
      <Card title="Empty state" sectioned>
        <InputTimer {...field} mode="inline" />
      </Card>
      <div>
        <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
      </div>
    </ApplicationFramePage>
  );
};

export const WithOptionLabel = () => {
  const field = useField<InputTimerFieldType>(undefined);

  return (
    <ApplicationFramePage>
      <Card title="optionLabel" sectioned>
        <InputTimer data={mock} {...field} optionLabel="Vælge fra listen" />
      </Card>
      <div>
        <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
      </div>
    </ApplicationFramePage>
  );
};

const result = eachHourOfInterval({
  start: setHours(new Date(), 8),
  end: setHours(new Date(), 21),
});

const mock = result.map((r) => ({
  start: r.toJSON(),
  end: addHours(r, 1).toJSON(),
}));
