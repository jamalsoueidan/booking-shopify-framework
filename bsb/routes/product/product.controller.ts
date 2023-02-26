import {
  ProductServiceGetAll,
  ProductServiceGetAvailableStaff,
  ProductServiceGetById,
  ProductServiceUpdate,
} from "@jamalsoueidan/bsb.services.product";
import { ControllerProps, ShopQuery } from "@jamalsoueidan/bsb.types.api";

import {
  ProductServiceGetAllProps,
  ProductServiceGetAvailableStaffProps,
  ProductServiceGetByIdProps,
  ProductServiceUpdateBodyProps,
  ProductServiceUpdateQueryProps,
} from "@jamalsoueidan/bsb.types.product";

export const productGetAll = ({
  query,
}: ControllerProps<ProductServiceGetAllProps & ShopQuery>) =>
  ProductServiceGetAll(query);

export const productGetById = async ({
  query,
}: ControllerProps<ProductServiceGetByIdProps>) => ProductServiceGetById(query);

export const productUpdate = ({
  query,
  body,
}: ControllerProps<
  ProductServiceUpdateQueryProps,
  ProductServiceUpdateBodyProps
>) => ProductServiceUpdate(query, body);

export const productGetAvailableStaff = ({
  query,
}: ControllerProps<ProductServiceGetAvailableStaffProps>) =>
  ProductServiceGetAvailableStaff(query);
