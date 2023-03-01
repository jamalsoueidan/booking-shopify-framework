import { Tag } from "@jamalsoueidan/backend.types.tag";
import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import React from "react";
import { useTag } from "./use-tag";

function MockComponent() {
  const { selectTag } = useTag();
  return <>{selectTag(Tag.weekday)}</>;
}

export const Basic = withApplication(() => <MockComponent />, {
  pageTitle: "useTag",
});
