import React from "react";
import { render } from "@testing-library/react";
import { BasicTranslation } from "./use-translation.composition";

it("should increment counter", () => {
  const { getByText } = render(<BasicTranslation />);
  const rendered = getByText("Alle medarbejder");
  expect(rendered).toBeTruthy();
});
