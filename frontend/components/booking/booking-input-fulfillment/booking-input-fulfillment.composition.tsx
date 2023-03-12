import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import { AlphaCard } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import React from "react";
import {
  BookingInputFulfillment,
  BookingInputFulfillmentField,
} from "./booking-input-fulfillment";

export const Basic = withApplication(
  () => {
    const field = useField<BookingInputFulfillmentField>(undefined);
    return (
      <>
        <AlphaCard>
          <BookingInputFulfillment field={field} />
        </AlphaCard>
        <div>
          <pre>choice: {field.value}</pre>
        </div>
      </>
    );
  },
  { title: "Booking Input Fulfillment" },
);

export const BasicLabelHidden = withApplication(
  () => {
    const field = useField<BookingInputFulfillmentField>(undefined);
    return (
      <>
        <AlphaCard>
          <BookingInputFulfillment
            field={field}
            input={{ labelHidden: true }}
          />
        </AlphaCard>
        <div>
          <pre>choice: {field.value}</pre>
        </div>
      </>
    );
  },
  { title: "Booking Input Fulfillment" },
);
