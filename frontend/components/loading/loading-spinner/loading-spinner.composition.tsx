import { ApplicationFramePage } from "@jamalsoueidan/bit-dev.preview.application";
import React from "react";
import { LoadingSpinner } from "./loading-spinner";

export const BasicLoadingSpinner = () => {
  return (
    <ApplicationFramePage title="Loading spinner">
      <LoadingSpinner />
    </ApplicationFramePage>
  );
};
