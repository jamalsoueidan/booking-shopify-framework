import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import React from "react";
import { mock } from "./mock";
import { ProductResourceList } from "./product-resource-list";

export const BasicProductResourceList = withApplication(() => (
  <ProductResourceList items={mock} />
));
