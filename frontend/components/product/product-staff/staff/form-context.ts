import {
  Product,
  ProductServiceUpdateBodyStaffProperty,
} from "@jamalsoueidan/backend.types.product";
import { DynamicList } from "@shopify/react-form/build/ts/hooks/list/dynamiclist";
import { createContext } from "react";

export type FormContextProps = {
  product: Product<ProductServiceUpdateBodyStaffProperty>;
  staffField: DynamicList<ProductServiceUpdateBodyStaffProperty>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FormContext = createContext<FormContextProps>({} as any);
