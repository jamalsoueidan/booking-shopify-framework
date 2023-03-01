import { ApplicationFramePage } from "@jamalsoueidan/bit-dev.preview.application";
import React from "react";
import { LoadingModal } from "./loading-modal";

export const BasicLoadingModal = () => {
  return (
    <ApplicationFramePage>
      <LoadingModal title="Loading..." />
    </ApplicationFramePage>
  );
};
