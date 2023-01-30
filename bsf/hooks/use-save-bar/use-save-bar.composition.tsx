import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { SaveBarProvider } from "@jamalsoueidan/bsf.providers.save-bar";
import React, { useEffect } from "react";
import { useSaveBar } from "./use-save-bar";

function MockComponent() {
  const { updateVisibility } = useSaveBar();

  useEffect(() => {
    updateVisibility(true);
  }, [updateVisibility]);

  return <></>;
}

export const BasicuseSaveBar = () => (
  <ApplicationFramePage title="useSaveBar">
    <SaveBarProvider>
      <MockComponent />
    </SaveBarProvider>
  </ApplicationFramePage>
);
