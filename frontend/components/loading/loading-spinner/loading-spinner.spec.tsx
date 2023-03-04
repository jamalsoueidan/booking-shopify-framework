import { render } from "@jamalsoueidan/bit-dev.testing-library.react";
import React from "react";
import { Basic } from "./loading-spinner.composition";

it("should render with the correct text", () => {
  const { getByText } = render(<Basic />);
  const rendered = getByText("Loading");
  expect(rendered).toBeTruthy();
});
