import React from "react";
import { withApplication } from "./with-application";

export const Basic = withApplication(
  () => {
    return <>This is for Bit.dev, works as wrapper!</>;
  },
  { pageTitle: "page title" },
);
