import React from "react";
import { render } from "@jamalsoueidan/bsd.testing-library.react";
import { BasicDropdownMultiSelectInput } from "./dropdown-multi-select-input.composition";

it("should render with the correct text", () => {
  const { getByText } = render(<BasicDropdownMultiSelectInput />);
  const rendered = getByText("User list");
  expect(rendered).toBeTruthy();
});
