import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import { AlphaCard, Button } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import { addDays, addHours, eachHourOfInterval, setHours } from "date-fns";
import React, { useEffect, useState } from "react";
import { InputTimerDrop, InputTimerDropField } from "./input-timer-drop";

export const Basic = withApplication(() => {
  const field = useField<InputTimerDropField>(undefined);

  return (
    <>
      <AlphaCard>
        <InputTimerDrop data={mock} field={field} />
      </AlphaCard>
      <div>
        <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
      </div>
    </>
  );
});

export const Error = withApplication(
  () => {
    const field = useField<InputTimerDropField>(undefined);

    useEffect(() => {
      field.setError("fejl");
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <>
        <AlphaCard>
          <InputTimerDrop
            data={mock}
            field={field}
            input={{ placeholder: "-" }}
          />
        </AlphaCard>
        <div>
          <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
        </div>
      </>
    );
  },
  { title: "Error" },
);

export const Selected = withApplication(
  () => {
    const field = useField<InputTimerDropField>({
      end: new Date(mock[0].end),
      start: new Date(mock[0].start),
    });

    return (
      <>
        <AlphaCard>
          <InputTimerDrop data={mock} field={field} />
        </AlphaCard>
        <div>
          <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
        </div>
      </>
    );
  },
  { title: "Selected" },
);

export const Empty = withApplication(
  () => {
    const field = useField<InputTimerDropField>(undefined);

    return (
      <>
        <AlphaCard>
          <InputTimerDrop field={field} />
        </AlphaCard>
        <div>
          <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
        </div>
      </>
    );
  },
  { title: "Empty" },
);

export const WithOptionLabel = withApplication(
  () => {
    const field = useField<InputTimerDropField>(undefined);

    return (
      <>
        <AlphaCard>
          <InputTimerDrop
            data={mock}
            field={field}
            input={{ placeholder: "-" }}
          />
        </AlphaCard>
        <div>
          <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
        </div>
      </>
    );
  },
  { title: "WithOptionLabel" },
);

export const LazyLoad = withApplication(
  () => {
    const field = useField<InputTimerDropField>(undefined);
    const [data, setData] = useState(mock);

    return (
      <>
        <AlphaCard>
          <InputTimerDrop field={field} data={data} />
        </AlphaCard>
        <Button
          onClick={() => setData(createMock(addDays(new Date(), 2), 11, 18))}
        >
          Change time
        </Button>
        <div>
          <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
        </div>
      </>
    );
  },
  { title: "LazyLoad" },
);

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
