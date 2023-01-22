import React from "react";
import { InputTimer } from "./input-timer";
import { mock } from "./mock";
import { useField } from "@shopify/react-form";
import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { Card } from "@shopify/polaris";

export const BasicInputTimer = () => {
  const field = useField({ start: "", end: "" });

  return (
    <ApplicationFramePage>
      <Card title="no optionLabel" sectioned>
        <InputTimer data={mock} {...field} />
      </Card>

      <Card title="optionLabel" sectioned>
        <InputTimer data={mock} {...field} optionLabel="Vælge fra listen" />
      </Card>
    </ApplicationFramePage>
  );
};
