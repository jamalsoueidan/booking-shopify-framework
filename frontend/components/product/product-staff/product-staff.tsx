import {
  Product,
  ProductServiceUpdateBodyStaffProperty,
} from "@jamalsoueidan/backend.types.product";
import { DynamicList } from "@shopify/react-form/build/ts/hooks/list/dynamiclist";
import React, { memo, useCallback, useState } from "react";
import { FormContext } from "./staff/form-context";
import { StaffList } from "./staff/staff-list";
import { StaffModal } from "./staff/staff-modal";

export interface ProductStaffProps {
  product: Product<ProductServiceUpdateBodyStaffProperty>;
  field: DynamicList<ProductServiceUpdateBodyStaffProperty>;
}

export const ProductStaff = memo(({ product, field }: ProductStaffProps) => {
  const [showModal, setShowModal] = useState(false);

  const show = useCallback(() => setShowModal(() => true), []);
  const hide = useCallback(() => setShowModal(() => false), []);

  return (
    <FormContext.Provider value={{ field, product }}>
      <StaffList action={show} />
      <StaffModal productId={product._id} show={showModal} close={hide} />
    </FormContext.Provider>
  );
});
