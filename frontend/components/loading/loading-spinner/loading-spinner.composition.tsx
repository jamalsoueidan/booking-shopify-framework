import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import React from "react";
import { LoadingSpinner } from "./loading-spinner";

export const Basic = withApplication(() => <LoadingSpinner />, {
  hideControls: true,
});
