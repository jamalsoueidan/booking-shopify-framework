import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import React from "react";
import { LoadingPage } from "./loading-page";

export const BasicLoadingPage = withApplication(
  () => <LoadingPage title="Loading Data"></LoadingPage>,
  { hideControls: true },
);
