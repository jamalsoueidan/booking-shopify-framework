import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import { Card } from "@shopify/polaris";
import React from "react";
import { BookingCalendar } from "./booking-calendar";
import { BookingCalendarCore } from "./booking-calendar-core";
import mock from "./mock";

const payload = [
  {
    __v: 0,
    _id: "63bb71c898f50e4f24c883a8",
    active: true,
    address: "adwijo",
    avatar: "https://www.w3schools.com/w3images/avatar6.png",
    email: "jamal@soueidan.com",
    fullname: "jamalsoueidan",
    group: "all",
    phone: "4531317428",
    position: "1",
    postal: 8220,
    shop: "testeriphone.myshopify.com",
  },
  {
    __v: 0,
    _id: "63de6b91769dac4d74557426",
    active: true,
    address: "sdadsioj",
    avatar: "https://www.w3schools.com/w3images/avatar6.png",
    email: "sarasoueidan@gmail.com",
    fullname: "sara soueidan",
    group: "all",
    phone: "4512345678",
    position: "2",
    postal: 8220,
    shop: "testeriphone.myshopify.com",
  },
];

export const Basic = withApplication(
  () => (
    <Card sectioned>
      <BookingCalendar
        staff={payload}
        data={mock}
        onChangeDate={() => null}
        onClickBooking={() => null}
      />
    </Card>
  ),
  { pageTitle: "Booking Calendar" },
);

export const NoToolbar = withApplication(
  () => (
    <Card sectioned>
      <BookingCalendarCore
        data={mock}
        onChangeDate={() => null}
        onClickBooking={() => null}
        headerToolbar={{
          center: undefined,
          left: undefined,
          right: undefined,
        }}
      />
    </Card>
  ),
  { pageTitle: "Booking Calendar" },
);

export const BasicNoStaff = withApplication(
  () => (
    <Card sectioned>
      <BookingCalendar
        staff={[]}
        data={mock}
        onChangeDate={() => null}
        onClickBooking={() => null}
      />
    </Card>
  ),
  { pageTitle: "Booking Calendar" },
);
