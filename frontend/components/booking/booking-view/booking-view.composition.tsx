import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import { ModalProvider } from "@jamalsoueidan/frontend.providers.modal";
import React from "react";
import { BookingView } from "./booking-view";
import mock from "./mock";

export const Basic = withApplication(() => (
  <ModalProvider title="hej med dig" open onClose={() => {}}>
    <BookingView booking={mock} navigate={() => null} />
  </ModalProvider>
));
