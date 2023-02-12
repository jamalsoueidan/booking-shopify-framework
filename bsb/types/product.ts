import { Staff } from "./staff";

export interface ProductStaff {
  staff: string;
  tag: string;
}
export interface Product<T = ProductStaff> {
  _id: string;
  productId: number;
  active: boolean;
  hidden: boolean;
  buffertime: number;
  collectionId: number;
  duration: number;
  shop: string;
  title: string;
  staff: T[];
  imageUrl: string;
}

export type ProductServiceGetByIdProps = {
  id: string;
};

export type ProductServiceUpdateQueryProps = {
  id: string;
};

export type ProductServiceUpdateBodyStaffProperty = Partial<Staff> & {
  _id: string;
  tag: string;
};

export type ProductServiceUpdateBodyProps = Partial<
  Pick<Product, "duration" | "buffertime" | "active">
> & {
  staff?: ProductServiceUpdateBodyStaffProperty[];
};

export type ProductServiceGetAvailableStaffReturn = Staff & {
  tags: string[];
};
