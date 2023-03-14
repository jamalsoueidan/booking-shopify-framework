import { render } from "@jamalsoueidan/bit-dev.testing-library.react";
import React from "react";
import { BasicScheduleModalEditManyShifts } from "./schedule-modal-edit-many-shifts.composition";

it("should render with the correct text", () => {
  const { getByText } = render(<BasicScheduleModalEditManyShifts />);
  const rendered = getByText("Loading");
  expect(rendered).toBeTruthy();
});
