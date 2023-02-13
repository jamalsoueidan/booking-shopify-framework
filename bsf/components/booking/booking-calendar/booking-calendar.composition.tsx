import { withApplication } from "@jamalsoueidan/bsd.preview.with-application";
import { Card } from "@shopify/polaris";
import React from "react";
import { BookingCalendar } from "./booking-calendar";
import mock from "./mock";

export const BasicBookingCalendar = withApplication(
  () => (
    <Card sectioned>
      <BookingCalendar
        data={mock}
        onChangeDate={() => null}
        onClickBooking={() => null}
      />
    </Card>
  ),
  { pageTitle: "Booking Calendar" },
);
