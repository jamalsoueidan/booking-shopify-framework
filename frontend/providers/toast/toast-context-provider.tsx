import React, { ReactNode } from "react";
import { ToastContext } from "./toast-context";
import { Toast, ToastProps } from "@shopify/polaris";
import { useCallback, useMemo, useState } from "react";

export type ToastProviderProps = {
  children: ReactNode;
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, setToast] = useState<Partial<ToastProps>>();
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const show = useCallback((value: Partial<ToastProps>) => {
    setToast(value);
    setActive(true);
  }, []);

  const value = useMemo(() => ({ show }), [show]);

  return (
    <ToastContext.Provider value={value}>
      {active && (
        <Toast duration={3500} content="" onDismiss={toggleActive} {...toast} />
      )}
      {children}
    </ToastContext.Provider>
  );
};
