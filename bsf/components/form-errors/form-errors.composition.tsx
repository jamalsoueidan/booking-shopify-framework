import React from "react";
import { FormErrors } from "./form-errors";
import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";

export const BasicFormErrors = () => {
  return (
    <ApplicationFramePage title="formErrors">
      <FormErrors errors={[{ message: "fejl i din besked" }]}></FormErrors>
    </ApplicationFramePage>
  );
};
