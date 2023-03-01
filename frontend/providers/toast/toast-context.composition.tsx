import { PreviewI18n } from "@jamalsoueidan/bit-dev.preview.preview-i18n";
import React, { useContext, useEffect } from "react";
import { ToastContext } from "./toast-context";
import { ToastProvider } from "./toast-context-provider";

const MockComponent = () => {
  const toast = useContext(ToastContext);
  useEffect(() => {
    toast?.show({ content: "hej med dig" });
    const timer = setTimeout(() => {
      toast?.show({ content: "hej there" });
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return <></>;
};

export const BasicToastUsage = () => {
  return (
    <PreviewI18n>
      <ToastProvider>
        <MockComponent />
      </ToastProvider>
    </PreviewI18n>
  );
};
