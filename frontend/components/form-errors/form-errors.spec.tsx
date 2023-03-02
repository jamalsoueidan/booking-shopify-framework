import { PreviwApplication } from "@jamalsoueidan/bit-dev.preview.application";
import { render, screen } from "@jamalsoueidan/bit-dev.testing-library.react";
import React from "react";
import { FormErrors } from "./form-errors";

it("should not render", async () => {
  const { getByText } = render(<FormErrors />, {
    wrapper: PreviwApplication,
  });
  const myComponent = screen.queryByTestId("form-errors");
  expect(myComponent).not.toBeInTheDocument();
});

it("should render when error exists", async () => {
  const { getByText } = render(
    <FormErrors errors={[{ message: "fejl i din besked" }]} />,
    {
      wrapper: PreviwApplication,
    },
  );
  const rendered = getByText("fejl i din besked");
  expect(rendered).toBeTruthy();
});
