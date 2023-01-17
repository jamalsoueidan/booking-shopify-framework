import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import React from "react";
import { ToastProvider } from "./toast-context-provider";
import { MockComponent } from "./toast-context.mock";

export const BasicToastUsage = () => {
  return (
    <ApplicationFramePage>
      <ToastProvider>
        <MockComponent />
      </ToastProvider>
    </ApplicationFramePage>
  );
};
