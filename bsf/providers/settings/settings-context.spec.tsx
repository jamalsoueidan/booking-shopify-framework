import React from "react";
import { BasicThemeUsage } from "./settings-context.composition";
import { render } from "@jamalsoueidan/bsd.testing-library.react";

it("should render the button in the color blue", () => {
  const { getByText } = render(<BasicThemeUsage />);
  const rendered = getByText("Dansk");
  expect(rendered).toBeTruthy();
});
