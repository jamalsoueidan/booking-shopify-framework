import { withApplication } from "@jamalsoueidan/bsd.preview.with-application";
import { useJsonDeserialization } from "@jamalsoueidan/bsf.hooks.use-json-deserialization";
import { Card } from "@shopify/polaris";
import React from "react";
import { BookingCalendar } from "./booking-calendar";
import mock from "./mock";

export const BasicBookingCalendar = withApplication(
  () => {
    const data = useJsonDeserialization(mock);

    return (
      <Card sectioned>
        <BookingCalendar
          data={data}
          onChangeDate={() => null}
          onClickBooking={() => null}
        />
      </Card>
    );
  },
  { pageTitle: "Booking Calendar" },
);
