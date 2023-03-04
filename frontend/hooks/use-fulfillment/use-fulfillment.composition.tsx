import { BookingFulfillmentStatus } from "@jamalsoueidan/backend.types.booking";
import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import React from "react";
import { useFulfillment } from "./use-fulfillment";

function MockComponent() {
  const { selectFulfillment } = useFulfillment();
  return <>{selectFulfillment(BookingFulfillmentStatus.CANCELLED)}</>;
}

export const Basic = withApplication(() => <MockComponent />, {
  title: "useFulfillment",
});
