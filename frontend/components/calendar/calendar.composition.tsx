import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import { Card } from "@shopify/polaris";
import React from "react";
import { Calendar } from "./calendar";

export const BasicCalendar = withApplication(
  () => (
    <Card sectioned>
      <Calendar />
    </Card>
  ),
  { title: "Calender" },
);
