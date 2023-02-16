import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { Button, Card, Range, Text } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import { addDays, addMonths, eachDayOfInterval, format } from "date-fns";
import React, { useCallback, useMemo, useState } from "react";
import { InputDate } from "./input-date";

export const Basic = () => {
  const [date, setDate] = useState<Range | undefined>(undefined);
  const field = useField(undefined);

  return (
    <ApplicationFramePage>
      <Card title="Normal mode" sectioned>
        <InputDate field={field} input={{ onMonthChange: setDate }} />
        <Text variant="bodyMd" as="p">
          {field.value ? format(field.value, "PPP") : ""}
        </Text>
        <div>
          <pre>onMonthChange: {JSON.stringify(date || {}, null, 2)}</pre>
        </div>
      </Card>
    </ApplicationFramePage>
  );
};

export const Selected = () => {
  const date = useMemo(() => addMonths(new Date(), 1), []);
  const field = useField(date);

  return (
    <ApplicationFramePage>
      <Card title="Inline mode" sectioned>
        <InputDate field={field} />
        <Text variant="bodyMd" as="p">
          {field.value ? format(field.value, "PPP") : ""}
        </Text>
      </Card>
    </ApplicationFramePage>
  );
};

export const DisableDates = () => {
  const field = useField(undefined);
  const [data, setData] = useState(mock);

  const changeData = useCallback(() => {
    const result = eachDayOfInterval({
      end: addDays(new Date(), 9),
      start: addDays(new Date(), 5),
    });
    setData(
      result.map((r) => ({
        date: r,
        hours: [],
      })),
    );
    field.onChange(undefined);
  }, [field]);

  return (
    <ApplicationFramePage>
      <Card title="Inline mode with data" sectioned>
        <InputDate data={data} field={field} disableDates />
        <Button onClick={changeData}>Change Data</Button>
        <Text variant="bodyMd" as="p">
          {field.value ? format(field.value, "PPP") : ""}
        </Text>
      </Card>
    </ApplicationFramePage>
  );
};

export const WithDataChange = () => {
  const field = useField(undefined);
  const [data, setData] = useState(mock);

  const changeData = useCallback(() => {
    const result = eachDayOfInterval({
      end: addDays(new Date(), 9),
      start: addDays(new Date(), 5),
    });
    setData(
      result.map((r) => ({
        date: r,
        hours: [],
      })),
    );
    field.onChange(undefined);
  }, [field]);

  return (
    <ApplicationFramePage>
      <Card title="Inline mode with data" sectioned>
        <InputDate data={data} field={field} />
        <Button onClick={changeData}>Change Data</Button>
        <Text variant="bodyMd" as="p">
          {field.value ? format(field.value, "PPP") : ""}
        </Text>
      </Card>
    </ApplicationFramePage>
  );
};

const result = eachDayOfInterval({
  end: addDays(new Date(), 4),
  start: addDays(new Date(), 2),
});

const mock = result.map((r) => ({
  date: r,
  hours: [],
}));
