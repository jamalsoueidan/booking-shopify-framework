import { ApplicationFramePage } from "@jamalsoueidan/bit-dev.preview.application";
import { Card } from "@shopify/polaris";
import React from "react";
import { Calendar } from "./calendar";

export const BasicCalendar = () => (
  <ApplicationFramePage title="Calendar">
    <Card sectioned>
      <Calendar />
    </Card>
  </ApplicationFramePage>
);
