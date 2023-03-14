import { render } from "@jamalsoueidan/bit-dev.testing-library.react";
import React from "react";
import { BasicScheduleModalCreateOneShift } from "./schedule-modal-create-one-shift.composition";

it("should render with the correct text", () => {
  const { getByText } = render(<BasicScheduleModalCreateOneShift />);
  const rendered = getByText("Loading");
  expect(rendered).toBeTruthy();
});
