import React from "react";
import { LoadingPage } from "./loading-page";
import { Application } from "@jamalsoueidan/bsd.preview.application";

export const BasicLoadingPage = () => {
  return (
    <Application>
      <LoadingPage title="Loading Data"></LoadingPage>
    </Application>
  );
};
