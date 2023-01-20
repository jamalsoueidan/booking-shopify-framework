import React from "react";
import { render } from "@jamalsoueidan/bsd.testing-library.react";
import { BasicSelectDaysInput } from "./select-days-input.composition";

it("should render with the correct text", () => {
  const { getByText } = render(<BasicSelectDaysInput />);
  const rendered = getByText("Vælge dage");
  expect(rendered).toBeTruthy();
});
