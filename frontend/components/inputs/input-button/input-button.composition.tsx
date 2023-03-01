import { ApplicationFramePage } from "@jamalsoueidan/bit-dev.preview.application";
import { Card } from "@shopify/polaris";
import React from "react";
import { InputButton } from "./input-button";

export const BasicInputButtonWithError = () => (
  <ApplicationFramePage>
    <Card title="Button (error)" sectioned>
      <InputButton error="error">Error</InputButton>
    </Card>
  </ApplicationFramePage>
);

export const BasicInputButtonNoError = () => (
  <ApplicationFramePage>
    <Card title="Button (no error)" sectioned>
      <InputButton>No error</InputButton>
    </Card>
  </ApplicationFramePage>
);

export const BasicInputButtonLoading = () => (
  <ApplicationFramePage>
    <Card title="Loading" sectioned>
      <InputButton loading>Loading</InputButton>
    </Card>
  </ApplicationFramePage>
);
