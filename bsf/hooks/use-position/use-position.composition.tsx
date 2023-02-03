import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import React from "react";
import { usePosition } from "./use-position";

function MockComponent() {
  const { select } = usePosition();

  const value = "2";

  return (
    <>
      {select("1")}
      <br />
      {select("2")}
      <br />
      {select(value)}
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
