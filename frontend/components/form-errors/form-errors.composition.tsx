import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import React from "react";
import { FormErrors } from "./form-errors";

export const Basic = withApplication(
  () => <FormErrors errors={[{ message: "fejl i din besked" }]} />,
  { title: "formErrors" },
);
