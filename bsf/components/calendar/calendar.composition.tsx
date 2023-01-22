import React from "react";
import { Calendar } from "./calendar";
import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { Card } from "@shopify/polaris";

export const BasicCalendar = () => {
  return (
    <ApplicationFramePage title="Calendar">
      <Card sectioned>
        <Calendar />
      </Card>
    </ApplicationFramePage>
  );
};
