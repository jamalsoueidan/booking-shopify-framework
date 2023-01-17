import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import React from "react";
import { usePosition } from "./use-position";

function MockComponent() {
  const { select } = usePosition();

  return (
    <>
      {select("1")}
      <br />
      {select("2")}
    </>
  );
}

export const BasicusePosition = () => {
  return (
    <ApplicationFramePage title="usePosition">
      <MockComponent />
    </ApplicationFramePage>
  );
};
