import { render } from "@jamalsoueidan/bsd.testing-library.react";
import React from "react";
import { Basic } from "./settings-context.composition";

it("should render the button in the color blue", () => {
  const { getByText } = render(<Basic />);
  const rendered = getByText("Dansk");
  expect(rendered).toBeTruthy();
});
