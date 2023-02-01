import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { Card } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import { addHours, eachHourOfInterval, setHours } from "date-fns";
import React, { useEffect } from "react";
import { InputTimerDivider, InputTimerDividerField } from "./input-timer-divider";

export const Basic = () => {
  const field = useField<InputTimerDividerField>(undefined);

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

export const Error = () => {
  const field = useField<InputTimerDividerField>(undefined);

  useEffect(() => {
    field.setError("fejl");
  }, []);

  return (
    <ApplicationFramePage>
      <Card title="Selected" sectioned>
        <InputTimerDivider data={mock} field={field} />
      </Card>
      <div>
        <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
      </div>
    </ApplicationFramePage>
  );
};

export const Selected = () => {
  const field = useField<InputTimerDividerField>(mock[0]);

  return (
    <ApplicationFramePage>
      <Card title="Selected" sectioned>
        <InputTimerDivider data={mock} field={field} />
      </Card>
      <div>
        <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
      </div>
    </ApplicationFramePage>
  );
};

export const Empty = () => {
  const field = useField<InputTimerDividerField>(undefined);

  return (
    <ApplicationFramePage>
      <Card title="Empty" sectioned>
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
