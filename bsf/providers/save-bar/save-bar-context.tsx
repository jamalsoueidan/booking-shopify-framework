import { createContext, FormEvent } from "react";

import { ContextualSaveBarProps } from "@shopify/polaris";

type SetReset = () => void;
type SetSubmit = (event?: FormEvent<Element>) => Promise<void>;

export interface ShowBarFormProps {
  dirty?: boolean;
  submitting?: boolean;
  reset?: SetReset;
  submit?: SetSubmit;
  show?: boolean;
}

interface SaveBarActions {
  setContextualSaveBar: (value: ContextualSaveBarProps) => void;
  setForm: (value: Partial<ShowBarFormProps>) => void;
}

interface SaveBarValues {
  form?: ShowBarFormProps;
  contextualSaveBar?: ContextualSaveBarProps;
}

interface SaveBarContextActionsValues extends SaveBarActions, SaveBarValues {}

export type SaveBarContextType = SaveBarContextActionsValues | undefined;

export const SaveBarContext = createContext<SaveBarContextType>(undefined);
