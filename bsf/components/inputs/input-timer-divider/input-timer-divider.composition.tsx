import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { Validators } from "@jamalsoueidan/bsf.helpers.validators";
import { Button, Card, Form } from "@shopify/polaris";
import { SubmitResult, useField, useForm } from "@shopify/react-form";
import { addDays, addHours, eachHourOfInterval, setHours } from "date-fns";
import React, { useState } from "react";
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
  const field = useField<InputTimerDividerField>({
    validates: [Validators.notEmptyObject<InputTimerDividerField>("error not selected")],
    value: undefined,
  });

  const { fields, submit } = useForm({
    fields: { time: field },
    onSubmit: async (): Promise<SubmitResult> => ({ status: "success" }),
  });

  return (
    <ApplicationFramePage>
      <Card title="Selected" sectioned>
        <Form onSubmit={submit}>
          <InputTimerDivider data={mock} field={fields.time} />
          <Button onClick={submit}>Send</Button>
        </Form>
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

export const Disabled = () => {
  const field = useField<InputTimerDividerField>(undefined);

  return (
    <ApplicationFramePage>
      <Card title="Empty" sectioned>
        <InputTimerDivider field={field} input={{ disabled: true }} />
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

export const LazyLoad = () => {
  const field = useField<InputTimerDividerField>(undefined);
  const [data, setData] = useState(mock);

  return (
    <ApplicationFramePage>
      <Card title="Lazy Load" sectioned>
        <InputTimerDivider field={field} data={data} />
      </Card>
      <Button onClick={() => setData(createMock(addDays(new Date(), 2), 11, 18))}>Change time</Button>
      <div>
        <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
      </div>
    </ApplicationFramePage>
  );
};

const createMock = (date = new Date(), start = 9, end = 21) => {
  const result = eachHourOfInterval({
    end: setHours(date, end),
    start: setHours(date, start),
  });

  return result.map((r) => ({
    end: addHours(r, 1).toJSON(),
    start: r.toJSON(),
  }));
};

const mock = createMock();
