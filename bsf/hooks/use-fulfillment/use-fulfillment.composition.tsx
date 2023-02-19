import { BookingFulfillmentStatus } from "@jamalsoueidan/bsb.types.booking";
import { withApplication } from "@jamalsoueidan/bsd.preview.with-application";
import React from "react";
import { useFulfillment } from "./use-fulfillment";

function MockComponent() {
  const { selectFulfillment } = useFulfillment();
  return <>{selectFulfillment(BookingFulfillmentStatus.CANCELLED)}</>;
}

export const Basic = withApplication(() => <MockComponent />, {
  pageTitle: "useFulfillment",
});
