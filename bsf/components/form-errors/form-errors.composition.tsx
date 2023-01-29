import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import React from "react";
import { FormErrors } from "./form-errors";

export const BasicFormErrors = () => (
  <ApplicationFramePage title="formErrors">
    <FormErrors errors={[{ message: "fejl i din besked" }]} />
  </ApplicationFramePage>
);
