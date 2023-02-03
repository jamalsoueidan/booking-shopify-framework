import { render } from "@jamalsoueidan/bsd.testing-library.react";
import React from "react";
import { BasicLoadingPage } from "./loading-page.composition";

it("should render with the correct text", () => {
  const { getByText } = render(<BasicLoadingPage />);
  const rendered = getByText("Loading Data");
  expect(rendered).toBeTruthy();
});
