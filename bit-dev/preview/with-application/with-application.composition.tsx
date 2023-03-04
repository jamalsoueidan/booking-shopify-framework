import React from "react";
import { withApplication } from "./with-application";

export const Basic = withApplication(
  () => <>This is for Bit.dev, works as wrapper!</>,
  { title: "page title" },
);
