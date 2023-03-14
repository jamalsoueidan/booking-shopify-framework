import { BookingFulfillmentStatus } from "@jamalsoueidan/backend.types.booking";
import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import React from "react";
import { useFulfillment } from "./use-fulfillment";

function MockComponent() {
  const { selectFulfillmentLabel } = useFulfillment();
  return <>{selectFulfillmentLabel(BookingFulfillmentStatus.CANCELLED)}</>;
}

export const Basic = withApplication(() => <MockComponent />, {
  title: "useFulfillment",
});
