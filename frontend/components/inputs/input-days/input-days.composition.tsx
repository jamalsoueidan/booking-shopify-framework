import { ScheduleServiceDaysInterval } from "@jamalsoueidan/backend.types.schedule";
import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import { AlphaCard } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import React from "react";
import { InputDays } from "./input-days";

export const Basic = withApplication(
  () => {
    const field = useField<ScheduleServiceDaysInterval[]>([]);
    return (
      <>
        <AlphaCard>
          <InputDays field={field} />
        </AlphaCard>
        <div>
          <pre>{JSON.stringify(field?.value || {}, null, 2)}</pre>
        </div>
      </>
    );
  },
  { title: "Select days input" },
);
