import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import React from "react";
import { useTag } from "./use-tag";

function MockComponent() {
  const { select } = useTag();
  return <>{select("#d24e01")}</>;
}

export const BasicuseToast = () => {
  return (
    <ApplicationFramePage title="useToast">
      <MockComponent />
    </ApplicationFramePage>
  );
};
