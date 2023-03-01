import { Application } from "@jamalsoueidan/bit-dev.preview.application";
import React from "react";
import { LoadingPage } from "./loading-page";

export const BasicLoadingPage = () => {
  return (
    <Application>
      <LoadingPage title="Loading Data"></LoadingPage>
    </Application>
  );
};
