import React from "react";
import { render } from "@jamalsoueidan/bsd.testing-library.react";
import { BasicLoadingSpinner } from "./loading-spinner.composition";

it("should render with the correct text", () => {
  const { getByText } = render(<BasicLoadingSpinner />);
  const rendered = getByText("Loading");
  expect(rendered).toBeTruthy();
});
