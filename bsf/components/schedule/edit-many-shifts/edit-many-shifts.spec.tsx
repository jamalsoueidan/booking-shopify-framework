import { render } from "@jamalsoueidan/bsd.testing-library.react";
import React from "react";
import { BasicEditManyShifts } from "./edit-many-shifts.composition";

it("should render with the correct text", () => {
  const { getByText } = render(<BasicEditManyShifts />);
  const rendered = getByText("Edit many shift");
  expect(rendered).toBeTruthy();
});
