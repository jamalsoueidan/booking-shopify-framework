import React from "react";
import { BasicSaveBarUsage } from "./save-bar-context.composition";
import { render } from "@jamalsoueidan/bsd.testing-library.react";

it("should render the save-bar", () => {
  const { getByText } = render(<BasicSaveBarUsage />);
  const rendered = getByText("Save");
  expect(rendered).toBeTruthy();
});
