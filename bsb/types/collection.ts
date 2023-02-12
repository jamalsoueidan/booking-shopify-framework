import { Product } from "./product";
import { Staff } from "./staff";

export interface Collection {
  _id: string;
  shop: string;
  title: string;
  collectionId: number;
}

export interface CollectionServiceGetAllReturn extends Collection {
  products: Product<Staff>[];
}

export interface CollectionServiceCreateBodyProps {
  selections: string[];
}

export type CollectionServiceDestroyProps = {
  id: string;
};
