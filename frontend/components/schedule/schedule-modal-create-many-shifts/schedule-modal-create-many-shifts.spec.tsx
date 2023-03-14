import { render } from "@jamalsoueidan/bit-dev.testing-library.react";
import React from "react";
import { BasicScheduleModalCreateManyShifts } from "./schedule-modal-create-many-shifts.composition";

it("should render with the correct text", () => {
  const { getByText } = render(<BasicScheduleModalCreateManyShifts />);
  const rendered = getByText("Loading");
  expect(rendered).toBeTruthy();
});
