import React from "react";
import { render } from "@jamalsoueidan/bsd.testing-library.react";
import { BasicFormErrors } from "./form-errors.composition";

it("should render with the correct text", () => {
  const { getByText } = render(<BasicFormErrors />);
  const rendered = getByText("fejl i din besked");
  expect(rendered).toBeTruthy();
});
