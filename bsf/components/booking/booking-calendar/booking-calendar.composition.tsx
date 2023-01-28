import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { Card } from "@shopify/polaris";
import React from "react";
import { BookingCalendar } from "./booking-calendar";
import mock from "./mock";

export const BasicBookingCalendar = () => {
  return (
    <ApplicationFramePage title="Booking Calendar">
      <Card sectioned>
        <BookingCalendar data={mock} />
      </Card>
    </ApplicationFramePage>
  );
};
