import { useTranslation } from "@jamalsoueidan/frontend.hooks.use-translation";
import { ContextualSaveBar } from "@shopify/polaris";
import React, {
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  DiscardActions,
  SaveActions,
  SaveBarContext,
} from "./save-bar-context";

export interface SaveBarProviderProps {
  children?: ReactNode;
}

export const SaveBarProvider = ({ children }: SaveBarProviderProps) => {
  const { t } = useTranslation({ id: "save-bar-provider", locales });

  const [message, updateMessage] = useState<string>(t("unsaved"));
  const [discardAction, setDiscardAction] = useState<DiscardActions>({
    content: t("discard"),
  });

  const [saveAction, setSaveAction] = useState<SaveActions>({
    content: t("save"),
  });

  const [visibility, updateVisibility] = useState<boolean>(false);

  const updateDiscardAction = useCallback(
    (value: Partial<DiscardActions>) => {
      setDiscardAction((prev) => ({ ...prev, ...value }));
    },
    [setDiscardAction],
  );

  const updateSaveAction = useCallback(
    (value: Partial<SaveActions>) => {
      setSaveAction((prev) => ({ ...prev, ...value }));
    },
    [setSaveAction],
  );

  const contextualSaveBar = useMemo(
    () => ({
      discardAction,
      message,
      saveAction,
      updateDiscardAction,
      updateMessage,
      updateSaveAction,
      updateVisibility,
      visibility,
    }),
    [
      message,
      updateMessage,
      discardAction,
      updateDiscardAction,
      saveAction,
      updateSaveAction,
      visibility,
      updateVisibility,
    ],
  );

  return (
    <SaveBarContext.Provider value={contextualSaveBar}>
      <SaveBarConsumer />
      {children}
    </SaveBarContext.Provider>
  );
};

const SaveBarConsumer = () => {
  const { visibility, message, discardAction, saveAction } =
    useContext(SaveBarContext);
  return visibility ? (
    <ContextualSaveBar
      message={message}
      discardAction={discardAction}
      saveAction={saveAction}
    />
  ) : null;
};

const locales = {
  da: {
    discard: "Annullere",
    save: "Gem",
    unsaved: "Ikke-gemte ændringer",
  },
  en: {
    discard: "Discard",
    save: "Save",
    unsaved: "Unsaved changes",
  },
};
