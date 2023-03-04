import { render } from "@jamalsoueidan/bit-dev.testing-library.react";
import React from "react";
import { BasicStaffResourceList } from "./staff-resource-list.composition";

it("should render with the correct text", () => {
  const { getByText } = render(<BasicStaffResourceList />);
  const rendered = getByText("jamal");
  expect(rendered).toBeTruthy();
});
