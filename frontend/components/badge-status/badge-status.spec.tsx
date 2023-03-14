import { render } from "@jamalsoueidan/bit-dev.testing-library.react";
import React from "react";
import { BasicBadgeStatus } from "./badge-status.composition";

it("should render with the correct text", () => {
  const { getByText } = render(<BasicBadgeStatus />);
  const rendered = getByText("Active");
  expect(rendered).toBeTruthy();
});
