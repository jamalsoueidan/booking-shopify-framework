import { Product, ProductStaffAggreate } from "./product";

export interface Collection {
  _id: string;
  shop: string;
  title: string;
  collectionId: number;
}

export interface CollectionAggreate extends Collection {
  products: Product<ProductStaffAggreate>[];
}

export interface CollectionBodyCreate {
  selections: string[];
}
