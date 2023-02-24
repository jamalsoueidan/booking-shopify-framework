import { render } from "@jamalsoueidan/bsd.testing-library.react";
import React from "react";
import { BasicCreateOneShift } from "./schedule-form-one-shift.composition";

it("should render with the correct text", () => {
  const { getByText } = render(<BasicCreateOneShift />);
  const rendered = getByText("Create one shift");
  expect(rendered).toBeTruthy();
});
