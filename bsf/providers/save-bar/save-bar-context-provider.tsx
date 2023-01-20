import { ContextualSaveBar, ContextualSaveBarProps } from "@shopify/polaris";
import React, {
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { SaveBarContext, ShowBarFormProps } from "./save-bar-context";

export interface SaveBarProviderProps {
  children?: ReactNode;
}

export const SaveBarProvider = ({ children }: SaveBarProviderProps) => {
  const [form, setForm] = useState<ShowBarFormProps>();
  const [contextualSaveBar, setContextualSaveBar] =
    useState<ContextualSaveBarProps>();

  const changeForm = useCallback((newValues: Partial<ShowBarFormProps>) => {
    setForm((value) => ({ ...value, ...newValues }));
  }, []);

  const changeSaveBar = useCallback(
    (newValues: Partial<ContextualSaveBarProps>) => {
      setContextualSaveBar(() => newValues);
    },
    []
  );

  const value = useMemo(
    () => ({
      form,
      setForm: changeForm,
      contextualSaveBar,
      setContextualSaveBar: changeSaveBar,
    }),
    [form, contextualSaveBar]
  );

  return (
    <SaveBarContext.Provider value={value}>
      {children}
      <SaveBarConsumer></SaveBarConsumer>
    </SaveBarContext.Provider>
  );
};

export const SaveBarConsumer = () => {
  const context = useContext(SaveBarContext);

  return context?.form?.dirty && context?.form?.show ? (
    <ContextualSaveBar {...context?.contextualSaveBar} />
  ) : null;
};
