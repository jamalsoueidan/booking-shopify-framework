import React from "react";
import { LoadingSpinner } from "./loading-spinner";
import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";

export const BasicLoadingSpinner = () => {
  return (
    <ApplicationFramePage title="Loading spinner">
      <LoadingSpinner />
    </ApplicationFramePage>
  );
};
