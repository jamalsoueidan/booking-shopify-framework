import React from "react";
import { render } from "@jamalsoueidan/bsd.testing-library.react";
import { BasicLoadingPage } from "./loading-page.composition";

it("should render with the correct text", () => {
  const { getByText } = render(<BasicLoadingPage />, { wrapper: null });
  const rendered = getByText("Loading Data");
  expect(rendered).toBeTruthy();
});
