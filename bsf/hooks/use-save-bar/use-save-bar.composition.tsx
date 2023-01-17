import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { SaveBarProvider } from "@jamalsoueidan/bsf.providers.save-bar";
import React, { useEffect } from "react";
import { useSaveBar } from "./use-save-bar";

function MockComponent() {
  const context = useSaveBar({ show: true });

  useEffect(() => {
    context?.setContextualSaveBar({
      message: "unsaved changes",
      saveAction: {
        content: "Save",
      },
      discardAction: {
        content: "Discard",
      },
    });
    context?.setForm({ show: true, dirty: true });
  }, []);

  return <></>;
}

export const BasicuseSaveBar = () => {
  return (
    <ApplicationFramePage title="useSaveBar">
      <SaveBarProvider>
        <MockComponent />
      </SaveBarProvider>
    </ApplicationFramePage>
  );
};
