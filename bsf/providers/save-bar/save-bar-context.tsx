import { createContext } from "react";

import { ContextualSaveBarProps } from "@shopify/polaris";
import { FormEvent } from "react";

type setReset = () => void;
type setSubmit = (event?: FormEvent<Element>) => Promise<void>;

export interface ShowBarFormProps {
  dirty?: boolean;
  submitting?: boolean;
  reset?: setReset;
  submit?: setSubmit;
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

interface SaveBarContext extends SaveBarActions, SaveBarValues {}

export type SaveBarContextType = SaveBarContext | undefined;

export const SaveBarContext = createContext<SaveBarContextType>(undefined);
