import { render } from "@jamalsoueidan/bit-dev.testing-library.react";
import React from "react";
import { Basic } from "./use-translation.composition";

it("should increment counter", () => {
  const { getByText } = render(<Basic />);
  const rendered = getByText("Alle medarbejder");
  expect(rendered).toBeTruthy();
});
