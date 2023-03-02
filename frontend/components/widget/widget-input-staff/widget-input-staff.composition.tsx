import { Tag } from "@jamalsoueidan/backend.types.tag";
import { WidgetStaff } from "@jamalsoueidan/backend.types.widget";
import { PreviwApplication } from "@jamalsoueidan/bit-dev.preview.application";
import { Button, Card } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import React, { useEffect, useState } from "react";
import { WidgetInputStaff, WidgetInputStaffField } from "./widget-input-staff";

const data: WidgetStaff[] = [
  {
    fullname: "jamal swueidan",
    staff: "63bb71c898f50e4f24c883a8",
    tag: Tag.all_day,
  },
  {
    fullname: "sara soueidan",
    staff: "63bb71e798f50e4f24c883b9",
    tag: Tag.middle_of_week,
  },
];

export const Basic = () => {
  const field = useField<WidgetInputStaffField>(undefined);
  return (
    <PreviwApplication>
      <Card title="Basic" sectioned>
        <WidgetInputStaff data={data} field={field} />
      </Card>
      <div>
        <pre>staffId: {field.value?.staff}</pre>
      </div>
    </PreviwApplication>
  );
};

export const Error = () => {
  const field = useField<WidgetInputStaffField>(undefined);
  useEffect(() => {
    field.setError("error");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PreviwApplication>
      <Card title="Error" sectioned>
        <WidgetInputStaff data={data} field={field} />
      </Card>
      <div>
        <pre>staffId: {field.value?.staff}</pre>
      </div>
    </PreviwApplication>
  );
};

export const DisabledWithError = () => {
  const field = useField<WidgetInputStaffField>(undefined);
  const [staff, setStaff] = useState<Array<WidgetStaff>>([]);

  useEffect(() => {
    field.setError("fejl");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PreviwApplication>
      <Card title="Disabled with error" sectioned>
        <WidgetInputStaff
          data={staff}
          field={field}
          input={{
            disabled: !staff || staff.length === 0,
            helpText: "klik på knap og vælge bruger",
          }}
        />
      </Card>
      <br />
      <Button onClick={() => setStaff(data)}>Load staff</Button>
      <div>
        <pre>staffId: {field.value?.staff}</pre>
      </div>
    </PreviwApplication>
  );
};

export const LazyLoad = () => {
  const field = useField<WidgetInputStaffField>(undefined);
  const [staff, setStaff] = useState<Array<WidgetStaff>>([]);

  return (
    <PreviwApplication>
      <Card title="LazyLoad" sectioned>
        <WidgetInputStaff
          data={staff}
          field={field}
          input={{
            disabled: !staff || staff.length === 0,
            helpText: "klik på knap og vælge bruger",
          }}
        />
      </Card>
      <br />
      <Button onClick={() => setStaff(data)}>Load staff</Button>
      <div>
        <pre>staffId: {field.value?.staff}</pre>
      </div>
    </PreviwApplication>
  );
};
