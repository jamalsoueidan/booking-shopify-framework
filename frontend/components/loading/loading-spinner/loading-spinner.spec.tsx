import { render } from "@jamalsoueidan/bit-dev.testing-library.react";
import React from "react";
import { BasicLoadingSpinner } from "./loading-spinner.composition";

it("should render with the correct text", () => {
  const { getByText } = render(<BasicLoadingSpinner />);
  const rendered = getByText("Loading");
  expect(rendered).toBeTruthy();
});
