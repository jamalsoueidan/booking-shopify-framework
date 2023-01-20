import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import React, { useContext, useEffect } from "react";
import { ToastContext } from "./toast-context";

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
    <ApplicationFramePage>
      <MockComponent />
    </ApplicationFramePage>
  );
};
