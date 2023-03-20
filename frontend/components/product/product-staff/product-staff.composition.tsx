import { ProductServiceUpdateBodyStaffProperty } from "@jamalsoueidan/backend.types.product";
import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import { useDynamicList } from "@shopify/react-form";
import React from "react";
import { ProductStaff } from "./product-staff";

export const BasicProductStaff = withApplication(() => {
  const product = {
    _id: "342324",
    active: true,
    buffertime: 0,
    collectionId: 425845817661,
    duration: 60,
    hidden: false,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0663/2315/3213/products/images.jpg?v=1668451011",
    productId: 7971304571197,
    shop: "testeriphone.myshopify.com",
    staff: [],
    title: "Hair",
  };

  const staff = useDynamicList<ProductServiceUpdateBodyStaffProperty>(
    product?.staff || [],
    (staff: ProductServiceUpdateBodyStaffProperty) => staff,
  );

  return <ProductStaff product={product} field={staff} />;
});
