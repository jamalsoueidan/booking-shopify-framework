import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import { useField } from "@shopify/react-form";
import React from "react";
import { ProductStatus } from "./product-status";

export const BasicProductStatus = withApplication(() => {
  const field = useField(true);
  return <ProductStatus staffLength={1} active={field} />;
});
