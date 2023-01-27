import { WidgetStaff } from "@jamalsoueidan/bsb.mongodb.types";
import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { Button, Card } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import React, { useState } from "react";
import { InputStaff } from "./input-staff";

const data: WidgetStaff[] = [
  {
    staff: "63bb71c898f50e4f24c883a8",
    fullname: "jamal swueidan",
    tag: "jamal",
  },
  {
    staff: "63bb71e798f50e4f24c883b9",
    fullname: "sara soueidan",
    tag: "ahmad",
  },
];

export const BasicInputStaff = () => {
  const field = useField("");
  return (
    <ApplicationFramePage>
      <Card title="no optionLabel" sectioned>
        <InputStaff data={data} field={field} />
      </Card>
      <div>
        <pre>staffId: {field.value}</pre>
      </div>
    </ApplicationFramePage>
  );
};

export const laterStaffLoaded = () => {
  const field = useField("");
  const [staff, setStaff] = useState<Array<WidgetStaff>>([]);

  return (
    <ApplicationFramePage>
      <Card title="no optionLabel and staff loading" sectioned>
        <InputStaff data={staff} field={field} />
      </Card>
      <br />
      <Button onClick={() => setStaff(data)}>Load staff</Button>
      <div>
        <pre>staffId: {field.value}</pre>
      </div>
    </ApplicationFramePage>
  );
};

export const withOptionLabel = () => {
  const field = useField("");
  return (
    <ApplicationFramePage>
      <Card title="optionLabel" sectioned>
        <InputStaff data={data} field={field} input={{placeholder: "Vælg medarbejder"}} />
      </Card>
      <div>
        <pre>staffId: {field.value}</pre>
      </div>
    </ApplicationFramePage>
  );
};
