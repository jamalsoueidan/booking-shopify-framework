import { PreviwApplication } from "@jamalsoueidan/bit-dev.preview.application";
import { Card } from "@shopify/polaris";
import React from "react";
import { InputButton } from "./input-button";

export const BasicInputButtonWithError = () => (
  <PreviwApplication>
    <Card title="Button (error)" sectioned>
      <InputButton error="error">Error</InputButton>
    </Card>
  </PreviwApplication>
);

export const BasicInputButtonNoError = () => (
  <PreviwApplication>
    <Card title="Button (no error)" sectioned>
      <InputButton>No error</InputButton>
    </Card>
  </PreviwApplication>
);

export const BasicInputButtonLoading = () => (
  <PreviwApplication>
    <Card title="Loading" sectioned>
      <InputButton loading>Loading</InputButton>
    </Card>
  </PreviwApplication>
);
