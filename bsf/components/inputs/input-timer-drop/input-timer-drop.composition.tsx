import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { Button, Card } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import { addDays, addHours, eachHourOfInterval, setHours } from "date-fns";
import React, { useEffect, useState } from "react";
import { InputTimerDrop, InputTimerDropField } from "./input-timer-drop";

export const Basic = () => {
  const field = useField<InputTimerDropField>(undefined);

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

export const Error = () => {
  const field = useField<InputTimerDropField>(undefined);

  useEffect(() => {
    field.setError("fejl");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ApplicationFramePage>
      <Card title="Error" sectioned>
        <InputTimerDrop
          data={mock}
          field={field}
          input={{ placeholder: "-" }}
        />
      </Card>
      <div>
        <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
      </div>
    </ApplicationFramePage>
  );
};

export const Selected = () => {
  const field = useField<InputTimerDropField>({
    end: new Date(mock[0].end),
    start: new Date(mock[0].start),
  });

  return (
    <ApplicationFramePage>
      <Card title="Selected" sectioned>
        <InputTimerDrop data={mock} field={field} />
      </Card>
      <div>
        <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
      </div>
    </ApplicationFramePage>
  );
};

export const Empty = () => {
  const field = useField<InputTimerDropField>(undefined);

  return (
    <ApplicationFramePage>
      <Card title="Empty" sectioned>
        <InputTimerDrop field={field} />
      </Card>
      <div>
        <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
      </div>
    </ApplicationFramePage>
  );
};

export const WithOptionLabel = () => {
  const field = useField<InputTimerDropField>(undefined);

  return (
    <ApplicationFramePage>
      <Card title="WithOptionLabel" sectioned>
        <InputTimerDrop
          data={mock}
          field={field}
          input={{ placeholder: "-" }}
        />
      </Card>
      <div>
        <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
      </div>
    </ApplicationFramePage>
  );
};

export const LazyLoad = () => {
  const field = useField<InputTimerDropField>(undefined);
  const [data, setData] = useState(mock);

  return (
    <ApplicationFramePage>
      <Card title="Lazy Load" sectioned>
        <InputTimerDrop field={field} data={mock} />
      </Card>
      <Button
        onClick={() => setData(createMock(addDays(new Date(), 2), 11, 18))}
      >
        Change time
      </Button>
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
    end: addHours(r, 1),
    start: r,
  }));
};

const mock = createMock();
