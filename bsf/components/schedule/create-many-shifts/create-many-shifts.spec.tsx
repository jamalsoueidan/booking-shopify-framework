import React from "react";
import { render } from "@jamalsoueidan/bsd.testing-library.react";
import { BasicCreateManyShifts } from "./create-many-shifts.composition";

it("should render with the correct text", () => {
  const { getByText } = render(<BasicCreateManyShifts />);
  const rendered = getByText("Create many shifts");
  expect(rendered).toBeTruthy();
});
