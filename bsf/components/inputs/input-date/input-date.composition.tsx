import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { Button, Card, Range, Text } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import { addDays, addMonths, eachDayOfInterval, format } from "date-fns";
import React, { useCallback, useMemo, useState } from "react";
import { InputDate } from "./input-date";

export const Basic = () => {
  const [date, setDate] = useState<Range | undefined>(undefined);
  const field = useField(undefined);

  const onMonthChange = useCallback(
    (value: Range) => {
      setDate(value);
    },
    [setDate],
  );

  return (
    <ApplicationFramePage>
      <Card title="Normal mode" sectioned>
        <InputDate field={field} input={{ onMonthChange }} />
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

export const Inline = () => {
  const field = useField(undefined);

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

export const LabelHidden = () => {
  const field = useField(undefined);

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

export const WithData = () => {
  const field = useField(undefined);

  return (
    <ApplicationFramePage>
      <Card title="Inline mode with data" sectioned>
        <InputDate data={mock} field={field} />
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
      start: addDays(new Date(), 5),
      end: addDays(new Date(), 9),
    });
    setData(
      result.map((r) => ({
        date: r.toJSON(),
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
  start: addDays(new Date(), 2),
  end: addDays(new Date(), 4),
});

const mock = result.map((r) => ({
  date: r.toJSON(),
  hours: [],
}));
