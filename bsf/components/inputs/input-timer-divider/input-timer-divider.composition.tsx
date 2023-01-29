import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { Card } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import { addHours, eachHourOfInterval, setHours } from "date-fns";
import React from "react";
import { InputTimerDivider, InputTimerDividerFieldType } from "./input-timer-divider";

export const BasicInputTimer = () => {
  const field = useField<InputTimerDividerFieldType>(undefined);

  return (
    <ApplicationFramePage>
      <Card title="Basic" sectioned>
        <InputTimerDivider data={mock} field={field} />
      </Card>
      <div>
        <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
      </div>
    </ApplicationFramePage>
  );
};

export const SelectedState = () => {
  const field = useField<InputTimerDividerFieldType>(mock[0]);

  return (
    <ApplicationFramePage>
      <Card title="Selected state" sectioned>
        <InputTimerDivider data={mock} field={field} />
      </Card>
      <div>
        <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
      </div>
    </ApplicationFramePage>
  );
};

export const EmptyState = () => {
  const field = useField<InputTimerDividerFieldType>(undefined);

  return (
    <ApplicationFramePage>
      <Card title="Empty state" sectioned>
        <InputTimerDivider field={field} />
      </Card>
      <div>
        <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
      </div>
    </ApplicationFramePage>
  );
};

const result = eachHourOfInterval({
  end: setHours(new Date(), 21),
  start: setHours(new Date(), 8),
});

const mock = result.map((r) => ({
  end: addHours(r, 1).toJSON(),
  start: r.toJSON(),
}));
