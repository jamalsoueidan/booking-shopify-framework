import { render } from "@jamalsoueidan/bit-dev.testing-library.react";
import React from "react";
import { BasicProductStaffEmpty } from "./product-staff-empty.composition";

it("should render with the correct text", () => {
  const { getByText } = render(<BasicProductStaffEmpty />);
  const rendered = getByText("Vælge");
  expect(rendered).toBeTruthy();
});
