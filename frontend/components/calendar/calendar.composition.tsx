import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import { AlphaCard } from "@shopify/polaris";
import React from "react";
import { Calendar } from "./calendar";

export const BasicCalendar = withApplication(
  () => (
    <AlphaCard>
      <Calendar />
    </AlphaCard>
  ),
  { title: "Calender" },
);
