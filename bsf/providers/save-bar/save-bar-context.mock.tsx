import React, { useCallback, useContext, useEffect } from "react";
import { SaveBarContext } from "./save-bar-context";
import { Button } from "@shopify/polaris";

export const MockComponent = () => {
  const saveBar = useContext(SaveBarContext);

  useEffect(() => {
    saveBar?.setContextualSaveBar({
      message: "unsaved changes",
      saveAction: {
        content: "Save",
        onAction: () => onClick(),
      },
      discardAction: {
        content: "Discard",
        onAction: () => onClick(),
      },
    });
    saveBar?.setForm({ show: true, dirty: true });
  }, []);

  const onClick = useCallback(() => {
    saveBar?.setForm({
      show: !saveBar.form?.show,
      dirty: !saveBar.form?.dirty,
    });
  }, [saveBar]);

  return (
    <Button onClick={onClick}>{saveBar?.form?.show ? "hide" : "show"}</Button>
  );
};
