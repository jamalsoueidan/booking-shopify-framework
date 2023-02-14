import { withApplication } from "@jamalsoueidan/bsd.preview.with-application";
import React from "react";
import { useTag } from "./use-tag";

function MockComponent() {
  const { selectTag } = useTag();
  return <>{selectTag("#d24e01")}</>;
}

export const Basic = withApplication(() => <MockComponent />, {
  pageTitle: "useTag",
});
