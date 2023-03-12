import { Tag } from "@jamalsoueidan/backend.types.tag";
import { WidgetStaff } from "@jamalsoueidan/backend.types.widget";
import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import { AlphaCard, Button } from "@shopify/polaris";
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

export const Basic = withApplication(() => {
  const field = useField<WidgetInputStaffField>(undefined);
  return (
    <>
      <AlphaCard>
        <WidgetInputStaff data={data} field={field} />
      </AlphaCard>
      <div>
        <pre>staffId: {field.value?.staff}</pre>
      </div>
    </>
  );
}, {title: 'Basic'});

export const Error = withApplication(() => {
  const field = useField<WidgetInputStaffField>(undefined);
  useEffect(() => {
    field.setError("error");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AlphaCard>
        <WidgetInputStaff data={data} field={field} />
      </AlphaCard>
      <div>
        <pre>staffId: {field.value?.staff}</pre>
      </div>
    </>
  );
}, {title: 'Error'});

export const DisabledWithError = withApplication(() => {
  const field = useField<WidgetInputStaffField>(undefined);
  const [staff, setStaff] = useState<Array<WidgetStaff>>([]);

  useEffect(() => {
    field.setError("fejl");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AlphaCard>
        <WidgetInputStaff
          data={staff}
          field={field}
          input={{
            disabled: !staff || staff.length === 0,
            helpText: "klik på knap og vælge bruger",
          }}
        />
      </AlphaCard>
      <br />
      <Button onClick={() => setStaff(data)}>Load staff</Button>
      <div>
        <pre>staffId: {field.value?.staff}</pre>
      </div>
    </>
  );
}, {title: 'Disabled with error'})

export const LazyLoad = withApplication(() => {
  const field = useField<WidgetInputStaffField>(undefined);
  const [staff, setStaff] = useState<Array<WidgetStaff>>([]);

  return (
    <>
      <AlphaCard>
        <WidgetInputStaff
          data={staff}
          field={field}
          input={{
            disabled: !staff || staff.length === 0,
            helpText: "klik på knap og vælge bruger",
          }}
        />
      </AlphaCard>
      <br />
      <Button onClick={() => setStaff(data)}>Load staff</Button>
      <div>
        <pre>staffId: {field.value?.staff}</pre>
      </div>
    </>
  );
}, {title: 'Lazyload'});
