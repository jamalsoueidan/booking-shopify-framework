import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import React from "react";
import { ProductStaffEmpty } from "./product-staff-empty";

export const BasicProductStaffEmpty = withApplication(() => (
  <ProductStaffEmpty action={() => {}} />
));
