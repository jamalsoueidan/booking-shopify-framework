import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import { AlphaCard } from "@shopify/polaris";
import React from "react";
import { InputButton } from "./input-button";

export const BasicInputButtonWithError = withApplication(
  () => (
    <AlphaCard>
      <InputButton error="error">Error</InputButton>
    </AlphaCard>
  ),
  { title: "Button (Error)" },
);

export const BasicInputButtonNoError = withApplication(
  () => (
    <AlphaCard>
      <InputButton>No error</InputButton>
    </AlphaCard>
  ),
  { title: "Button (no error)" },
);

export const BasicInputButtonLoading = withApplication(
  () => (
    <AlphaCard>
      <InputButton loading>Loading</InputButton>
    </AlphaCard>
  ),
  { title: "Loading" },
);
