import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import React, { useEffect } from "react";
import { useToast } from "./use-toast";

function MockComponent() {
  const context = useToast();

  useEffect(() => {
    context.show({ content: "hej med dig" });
    const timer = setTimeout(() => {
      context.show({ content: "hej there" });
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return <></>;
}

export const BasicuseToast = () => {
  return (
    <ApplicationFramePage title="useToast">
      <MockComponent />
    </ApplicationFramePage>
  );
};
