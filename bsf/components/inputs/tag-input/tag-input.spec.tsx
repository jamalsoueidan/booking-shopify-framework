import React from "react";
import { render } from "@jamalsoueidan/bsd.testing-library.react";
import { BasicTagInput } from "./tag-input.composition";

it("should render with the correct text", () => {
  const { getByText } = render(<BasicTagInput />);
  const rendered = getByText("Alle dage");
  expect(rendered).toBeTruthy();
});
