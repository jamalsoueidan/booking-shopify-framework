import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import { useField } from "@shopify/react-form";
import React from "react";
import { ProductStatus } from "./product-status";

export const Basic = withApplication(() => {
  const field = useField(true);
  return <ProductStatus active={field} />;
});

export const BasicDisabled = withApplication(() => {
  const field = useField(true);
  return <ProductStatus disabled active={field} />;
});
