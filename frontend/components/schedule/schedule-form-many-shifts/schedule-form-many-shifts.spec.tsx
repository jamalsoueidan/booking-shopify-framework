import { render } from "@jamalsoueidan/bit-dev.testing-library.react";
import React from "react";
import { BasicCreateShifts } from "./schedule-form-many-shifts.composition";

it("should render with the correct text", () => {
  const { getByText } = render(<BasicCreateShifts />);
  const rendered = getByText("Create many shifts");
  expect(rendered).toBeTruthy();
});
