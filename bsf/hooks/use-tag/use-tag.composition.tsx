import { Tag } from "@jamalsoueidan/bsb.types.tag";
import { withApplication } from "@jamalsoueidan/bsd.preview.with-application";
import React from "react";
import { useTag } from "./use-tag";

function MockComponent() {
  const { selectTag } = useTag();
  return <>{selectTag(Tag.weekday)}</>;
}

export const Basic = withApplication(() => <MockComponent />, {
  pageTitle: "useTag",
});
