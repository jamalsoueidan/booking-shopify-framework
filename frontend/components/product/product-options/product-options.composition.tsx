import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import { useField, useForm } from "@shopify/react-form";
import React from "react";
import { ProductOptions } from "./product-options";

export const BasicProductOptions = withApplication(() => {
  const { fields } = useForm({
    fields: {
      buffertime: useField(5),
      duration: useField(30),
    },
  });

  return (
    <ProductOptions buffertime={fields.buffertime} duration={fields.duration} />
  );
});
