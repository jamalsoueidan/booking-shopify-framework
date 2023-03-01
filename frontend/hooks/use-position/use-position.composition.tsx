import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import React from "react";
import { usePosition } from "./use-position";

function MockComponent() {
  const { selectPosition } = usePosition();

  const value = "2";

  return (
    <>
      {selectPosition("1")}
      <br />
      {selectPosition("2")}
      <br />
      {selectPosition(value)}
    </>
  );
}

export const Basic = withApplication(() => <MockComponent />, {
  pageTitle: "usePosition",
});
