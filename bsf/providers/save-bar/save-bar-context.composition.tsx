import { PreviewI18n } from "@jamalsoueidan/bsd.preview.preview-i18n";
import { Button } from "@shopify/polaris";
import React, { useCallback, useContext, useEffect } from "react";
import { SaveBarContext } from "./save-bar-context";
import { SaveBarProvider } from "./save-bar-context-provider";

const MockComponent = () => {
  const { updateMessage, updateDiscardAction, updateSaveAction, updateVisibility, visibility } =
    useContext(SaveBarContext);

  const onClick = useCallback(() => {
    updateVisibility(!visibility);
  }, [updateVisibility, visibility]);

  useEffect(() => {
    updateMessage("unsaved changes");
    updateSaveAction({
      content: "Save",
      onAction: () => onClick(),
    });

    updateDiscardAction({
      content: "Discard",
      onAction: () => onClick(),
    });
  }, [onClick, updateDiscardAction, updateMessage, updateSaveAction]);

  return <Button onClick={onClick}>{visibility ? "hide" : "show"}</Button>;
};

export const BasicSaveBarUsage = () => (
  <PreviewI18n>
    <SaveBarProvider>
      <MockComponent />
    </SaveBarProvider>
  </PreviewI18n>
);
