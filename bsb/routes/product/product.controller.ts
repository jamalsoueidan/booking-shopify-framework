import {
  ProductModel,
  ProductServiceGetAvailableStaff,
  ProductServiceGetById,
  ProductServiceUpdate,
} from "@jamalsoueidan/bsb.services.product";
import { ControllerProps, ShopQuery } from "@jamalsoueidan/bsb.types.api";

import {
  ProductServiceUpdateBodyProps,
  ProductServiceUpdateQueryProps,
} from "@jamalsoueidan/bsb.types.product";

export const productGetAll = ({ query }: ControllerProps<ShopQuery>) =>
  ProductModel.find({ shop: query.shop });

interface Query {
  id: string;
}

export const productGetById = async ({ query }: ControllerProps<Query>) =>
  ProductServiceGetById(query);

export const productUpdate = ({
  query,
  body,
}: ControllerProps<
  ProductServiceUpdateQueryProps,
  ProductServiceUpdateBodyProps
>) => ProductServiceUpdate(query, body);

export const productGetAvailableStaff = ({
  query,
}: ControllerProps<ShopQuery>) => ProductServiceGetAvailableStaff(query.shop);
