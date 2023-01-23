import React from "react";
import { LoadingModal } from "./loading-modal";
import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";

export const BasicLoadingModal = () => {
  return (
    <ApplicationFramePage>
      <LoadingModal title="Loading..." />
    </ApplicationFramePage>
  );
};
