import React from "react";
import { render } from "@jamalsoueidan/bsd.testing-library.react";
import { BasicBookingStaff } from "./booking-staff.composition";

it("should render with the correct text", () => {
  const { getByText } = render(<BasicBookingStaff />);
  const rendered = getByText("Alle medarbejder");
  expect(rendered).toBeTruthy();
});
