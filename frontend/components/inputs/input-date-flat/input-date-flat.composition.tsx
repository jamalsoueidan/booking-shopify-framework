import { ApplicationFramePage } from "@jamalsoueidan/bit-dev.preview.application";
import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import { Button, Card, Range, Text } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import { addDays, addMonths, eachDayOfInterval, format } from "date-fns";
import React, { useCallback, useMemo, useState } from "react";
import { InputDateFlat } from "./input-date-flat";

export const Basic = () => {
  const [date, setDate] = useState<Range | undefined>(undefined);
  const field = useField(undefined);

  return (
    <ApplicationFramePage>
      <Card sectioned>
        <InputDateFlat field={field} onMonthChange={setDate} />
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

export const SelectedTodayDate = () => {
  const date = useMemo(() => addMonths(new Date(), 1), []);
  const field = useField(date);

  return (
    <ApplicationFramePage>
      <Card sectioned>
        <InputDateFlat field={field} />
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
      <Card sectioned>
        <InputDateFlat field={field} />
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
      <Card sectioned>
        <InputDateFlat data={mock} field={field} />
        <Text variant="bodyMd" as="p">
          {field.value ? format(field.value, "PPP") : ""}
        </Text>
      </Card>
    </ApplicationFramePage>
  );
};

export const DisableDates = withApplication(() => {
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
    <Card sectioned>
      <InputDateFlat data={data} field={field} disableDates />
      <br />
      <Button onClick={changeData}>Change Data</Button>
      <Text variant="bodyMd" as="p">
        {field.value ? format(field.value, "PPP") : ""}
      </Text>
    </Card>
  );
});

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
      <Card sectioned>
        <InputDateFlat data={data} field={field} />
        <br />
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
