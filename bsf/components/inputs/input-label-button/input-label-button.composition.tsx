import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { Card } from "@shopify/polaris";
import React from "react";
import { InputLabelButton } from "./input-label-button";

export const InputLabelButtonError = () => (
  <ApplicationFramePage>
    <Card title="LabelButton (error)" sectioned>
      <InputLabelButton labelled={{ error: "error", label: "label" }}>Error</InputLabelButton>
    </Card>
  </ApplicationFramePage>
);

export const InputLabelButtonNoError = () => (
  <ApplicationFramePage>
    <Card title="LabelButton (no error)" sectioned>
      <InputLabelButton labelled={{ label: "label" }}>No error</InputLabelButton>
    </Card>
  </ApplicationFramePage>
);

export const InputLabelButtonLoading = () => (
  <ApplicationFramePage>
    <Card title="LabelButton (loading)" sectioned>
      <InputLabelButton labelled={{ label: "label" }} button={{ loading: true }}>
        Loading
      </InputLabelButton>
    </Card>
  </ApplicationFramePage>
);
