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

// api/admin/products/:id
export interface ProductStaffAggreate extends Partial<Staff> {
  tag: string;
}

export interface ProductAggreate extends Omit<Product, "staff"> {
  staff: ProductStaffAggreate[];
}

// api/admin/products/:id/staff
export interface ProductAddStaff extends Staff {
  tags: string[];
}

// PUT api/admin/products/6383820e2817210cda196c4d
export interface ProductUpdateBody
  extends Partial<Pick<Product, "duration" | "buffertime" | "active">> {
  staff?: ProductStaffAggreate[];
}
