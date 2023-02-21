import { render } from "@jamalsoueidan/bsd.testing-library.react";
import React from "react";
import { BasicEditOneShift } from "./edit-one-shift.composition";

it("should render with the correct text", () => {
  const { getByText } = render(<BasicEditOneShift />);
  const rendered = getByText("Edit one shift");
  expect(rendered).toBeTruthy();
});
