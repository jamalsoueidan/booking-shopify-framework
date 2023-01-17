import React from "react";
import { BasicToastUsage } from "./toast-context.composition";
import { render } from "@jamalsoueidan/bsd.testing-library.react";

it("should render toast", () => {
  const { getByText } = render(<BasicToastUsage />);
  //const rendered = getByText("Hej med dig");
  //expect(rendered).toBeTruthy();
});
