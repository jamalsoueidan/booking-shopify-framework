import { render } from "@jamalsoueidan/bit-dev.testing-library.react";
import React from "react";
import { Basic } from "./staff-resource-item.composition";

it("should render with the correct text", () => {
  const { getByText } = render(<Basic />);
  const rendered = getByText("Title");
  expect(rendered).toBeTruthy();
});
