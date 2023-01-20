import React from "react";
import { render } from "@jamalsoueidan/bsd.testing-library.react";
import { BasicCreateOneShift } from "./create-one-shift.composition";

it("should render with the correct text", () => {
  const { getByText } = render(<BasicCreateOneShift />);
  const rendered = getByText("Create one shift");
  expect(rendered).toBeTruthy();
});
