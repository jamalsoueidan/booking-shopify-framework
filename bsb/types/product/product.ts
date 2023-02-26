import { Staff } from "@jamalsoueidan/bsb.types.staff";
import { Tag } from "@jamalsoueidan/bsb.types.tag";

export interface ProductStaff {
  staff: string;
  tag: Tag;
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

export type ProductServiceGetAllProps = {
  group?: string;
  staff?: string;
};

export type ProductServiceGetByIdProps = {
  group?: string;
  id: string;
};

export type ProductServiceUpdateQueryProps = {
  id: string;
};

export type ProductServiceUpdateBodyStaffProperty = Partial<Staff> & {
  _id: string;
  tag: Tag;
};

export type ProductServiceUpdateBodyProps = Partial<
  Pick<Product, "duration" | "buffertime" | "active">
> & {
  staff?: ProductServiceUpdateBodyStaffProperty[];
};

export type ProductServiceUpdateReturn = {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedCount: number;
  matchedCount: number;
};

export type ProductServiceGetAvailableStaffReturn = Staff & {
  tags: Tag[];
};

export type ProductServiceGetAvailableStaffProps = {
  group?: string;
};
