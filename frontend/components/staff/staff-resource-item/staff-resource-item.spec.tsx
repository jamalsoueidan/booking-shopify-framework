import { render } from "@jamalsoueidan/bit-dev.testing-library.react";
import React from "react";
import { BasicStaffResourceItem } from "./staff-resource-item.composition";

it("should render with the correct text", () => {
  const { getByText } = render(<BasicStaffResourceItem />);
  const rendered = getByText("Title");
  expect(rendered).toBeTruthy();
});
