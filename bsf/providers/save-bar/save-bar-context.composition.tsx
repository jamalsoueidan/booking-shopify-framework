import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import React from "react";
import { SaveBarProvider } from "./save-bar-context-provider";
import { MockComponent } from "./save-bar-context.mock";

export const BasicSaveBarUsage = () => {
  return (
    <ApplicationFramePage title="saveBarProvider">
      <SaveBarProvider>
        <MockComponent />
      </SaveBarProvider>
    </ApplicationFramePage>
  );
};
