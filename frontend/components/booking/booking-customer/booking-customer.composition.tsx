import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import { ModalProvider } from "@jamalsoueidan/frontend.providers.modal";
import React from "react";
import { BookingCustomer } from "./booking-customer";
import mock from "./mock";

export const Basic = withApplication(() => (
  <ModalProvider title="hej med dig" open onClose={() => {}}>
    <BookingCustomer booking={mock} />
  </ModalProvider>
));
