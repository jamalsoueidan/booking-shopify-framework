import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { Card } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import { addHours, eachHourOfInterval, setHours } from "date-fns";
import React from "react";
import { InputTimerDrop, InputTimerDropFieldType } from "./input-timer-drop";

export const BasicInputTimer = () => {
  const field = useField<InputTimerDropFieldType>(undefined);

  return (
    <ApplicationFramePage>
      <Card title="Basic" sectioned>
        <InputTimerDrop data={mock} field={field} />
      </Card>
      <div>
        <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
      </div>
    </ApplicationFramePage>
  );
};

export const SelectedState = () => {
  const field = useField<InputTimerDropFieldType>(mock[0]);

  return (
    <ApplicationFramePage>
      <Card title="Selected state" sectioned>
        <InputTimerDrop data={mock} field={field} />
      </Card>
      <div>
        <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
      </div>
    </ApplicationFramePage>
  );
};

export const EmptyState = () => {
  const field = useField<InputTimerDropFieldType>(undefined);

  return (
    <ApplicationFramePage>
      <Card title="Empty state" sectioned>
        <InputTimerDrop field={field} />
      </Card>
      <div>
        <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
      </div>
    </ApplicationFramePage>
  );
};

export const WithOptionLabel = () => {
  const field = useField<InputTimerDropFieldType>(undefined);

  return (
    <ApplicationFramePage>
      <Card title="optionLabel" sectioned>
        <InputTimerDrop data={mock} field={field} input={{ placeholder: "-" }} />
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
