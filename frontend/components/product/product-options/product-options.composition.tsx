import { useField, useForm } from "@shopify/react-form";
import React from "react";
import { ProductOptions } from "./product-options";

export const BasicProductOptions = () => {
  const { fields } = useForm({
    fields: {
      buffertime: useField(5),
      duration: useField(30),
    },
  });

  return (
    <ProductOptions buffertime={fields.buffertime} duration={fields.duration} />
  );
};
