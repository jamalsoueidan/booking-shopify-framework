import { PreviwApplication } from "@jamalsoueidan/bit-dev.preview.application";
import { Card } from "@shopify/polaris";
import React from "react";
import { InputLabelButton } from "./input-label-button";

export const InputLabelButtonError = () => (
  <PreviwApplication>
    <Card title="LabelButton (error)" sectioned>
      <InputLabelButton labelled={{ error: "error", label: "label" }}>
        Error
      </InputLabelButton>
    </Card>
  </PreviwApplication>
);

export const InputLabelButtonNoError = () => (
  <PreviwApplication>
    <Card title="LabelButton (no error)" sectioned>
      <InputLabelButton labelled={{ label: "label" }}>
        No error
      </InputLabelButton>
    </Card>
  </PreviwApplication>
);

export const InputLabelButtonLoading = () => (
  <PreviwApplication>
    <Card title="LabelButton (loading)" sectioned>
      <InputLabelButton
        labelled={{ label: "label" }}
        button={{ loading: true }}
      >
        Loading
      </InputLabelButton>
    </Card>
  </PreviwApplication>
);
