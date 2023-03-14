import { render } from "@jamalsoueidan/bit-dev.testing-library.react";
import React from "react";
import { BasicScheduleModalCreateShift } from "./schedule-modal-create-shift.composition";

it("should render with the correct text", () => {
  const { getByText } = render(<BasicScheduleModalCreateShift />);
  const rendered = getByText("Loading");
  expect(rendered).toBeTruthy();
});
