import { WidgetStaff } from "@jamalsoueidan/bsb.mongodb.types";
import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { Button, Card } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import React, { useEffect, useState } from "react";
import { InputStaff, InputStaffField } from "./input-staff";

const data: WidgetStaff[] = [
  {
    fullname: "jamal swueidan",
    staff: "63bb71c898f50e4f24c883a8",
    tag: "jamal",
  },
  {
    fullname: "sara soueidan",
    staff: "63bb71e798f50e4f24c883b9",
    tag: "ahmad",
  },
];

export const BasicInputStaff = () => {
  const field = useField<InputStaffField>(undefined);
  return (
    <ApplicationFramePage>
      <Card title="no optionLabel" sectioned>
        <InputStaff data={data} field={field} />
      </Card>
      <div>
        <pre>staffId: {field.value?.staff}</pre>
      </div>
    </ApplicationFramePage>
  );
};

export const BasicInputStaffError = () => {
  const field = useField<InputStaffField>(undefined);
  useEffect(() => {
    field.setError("error");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ApplicationFramePage>
      <Card title="no optionLabel" sectioned>
        <InputStaff data={data} field={field} />
      </Card>
      <div>
        <pre>staffId: {field.value?.staff}</pre>
      </div>
    </ApplicationFramePage>
  );
};

export const LaterStaffLoaded = () => {
  const field = useField<InputStaffField>(undefined);
  const [staff, setStaff] = useState<Array<WidgetStaff>>([]);

  return (
    <ApplicationFramePage>
      <Card title="no optionLabel and staff loading" sectioned>
        <InputStaff data={staff} field={field} input={{ helpText: "klik på knap og vælge bruger" }} />
      </Card>
      <br />
      <Button onClick={() => setStaff(data)}>Load staff</Button>
      <div>
        <pre>staffId: {field.value?.staff}</pre>
      </div>
    </ApplicationFramePage>
  );
};

export const WithOptionLabel = () => {
  const field = useField<InputStaffField>(undefined);
  return (
    <ApplicationFramePage>
      <Card title="optionLabel" sectioned>
        <InputStaff data={data} field={field} />
      </Card>
      <div>
        <pre>staffId: {field.value?.staff}</pre>
      </div>
    </ApplicationFramePage>
  );
};
