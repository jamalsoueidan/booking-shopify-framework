import { createContext } from "react";

import { ContextualSaveBarProps } from "@shopify/polaris";

export type DiscardActions = ContextualSaveBarProps["discardAction"];
export type SaveActions = ContextualSaveBarProps["saveAction"];

export interface SaveBarContextProps extends ContextualSaveBarProps {
  updateMessage: (value: string) => void;
  updateDiscardAction: (value: Partial<DiscardActions>) => void;
  updateSaveAction: (value: Partial<SaveActions>) => void;
  visibility: boolean;
  updateVisibility: (value: boolean) => void;
}

const defaultValues: SaveBarContextProps = {
  message: "",
  updateDiscardAction: () => {},
  updateMessage: () => {},
  updateSaveAction: () => {},
  updateVisibility: () => {},
  visibility: false,
};

export const SaveBarContext = createContext<SaveBarContextProps>(defaultValues);
