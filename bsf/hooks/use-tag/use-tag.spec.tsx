import React from "react";
import { render } from "@jamalsoueidan/bsd.testing-library.react";
import { BasicUseTag } from "./use-tag.composition";

it("should render with the correct text", () => {
  const { getByText } = render(<BasicUseTag />);
  const rendered = getByText("Alle dage");
  expect(rendered).toBeTruthy();
});
