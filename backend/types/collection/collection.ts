import { Product } from "@jamalsoueidan/backend.types.product";
import { Staff } from "@jamalsoueidan/backend.types.staff";

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

export type CollectionServiceGetAllProps = {
  group?: string;
};
