import { ContextualSaveBar, ContextualSaveBarProps } from "@shopify/polaris";
import React, { ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { SaveBarContext, ShowBarFormProps } from "./save-bar-context";

export interface SaveBarProviderProps {
  children?: ReactNode;
}

export const SaveBarProvider = ({ children }: SaveBarProviderProps) => {
  const [form, setForm] = useState<ShowBarFormProps>();
  const [contextualSaveBar, setContextualSaveBar] = useState<ContextualSaveBarProps>();

  const changeForm = useCallback((newValues: Partial<ShowBarFormProps>) => {
    setForm((value) => ({ ...value, ...newValues }));
  }, []);

  const changeSaveBar = useCallback((newValues: Partial<ContextualSaveBarProps>) => {
    setContextualSaveBar(() => newValues);
  }, []);

  const value = useMemo(
    () => ({
      contextualSaveBar,
      form,
      setContextualSaveBar: changeSaveBar,
      setForm: changeForm,
    }),
    [contextualSaveBar, form, changeSaveBar, changeForm],
  );

  return (
    <SaveBarContext.Provider value={value}>
      <SaveBarConsumer />
      {children}
    </SaveBarContext.Provider>
  );
};

export const SaveBarConsumer = () => {
  const context = useContext(SaveBarContext);
  if (context) {
    const { form, contextualSaveBar } = context;
    return form?.dirty && form?.show ? <ContextualSaveBar {...contextualSaveBar} /> : null;
  }
  return <></>;
};
