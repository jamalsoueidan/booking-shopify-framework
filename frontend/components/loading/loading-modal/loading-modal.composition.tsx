import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import React from "react";
import { LoadingModal } from "./loading-modal";

export const Basic = withApplication(
  () => <LoadingModal title="Loading..." />,
  {
    hideControls: true,
  },
);
