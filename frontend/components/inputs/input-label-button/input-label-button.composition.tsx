import { withApplicationCard } from "@jamalsoueidan/bit-dev.preview.with-application";
import React from "react";
import { InputLabelButton } from "./input-label-button";

export const InputLabelButtonError = withApplicationCard(
  () => (
    <InputLabelButton labelled={{ error: "error", label: "label" }}>
      Error
    </InputLabelButton>
  ),
  { title: "LabelButton (error)" },
);

export const InputLabelButtonNoError = withApplicationCard(
  () => (
    <InputLabelButton labelled={{ label: "label" }}>No error</InputLabelButton>
  ),
  { title: "LabelButton (no error)" },
);

export const InputLabelButtonLoading = withApplicationCard(
  () => (
    <InputLabelButton labelled={{ label: "label" }} button={{ loading: true }}>
      Loading
    </InputLabelButton>
  ),
  { title: "LabelButton (loading)" },
);
