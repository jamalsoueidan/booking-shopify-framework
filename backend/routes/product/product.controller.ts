import {
  ProductServiceGetAll,
  ProductServiceGetAvailableStaff,
  ProductServiceGetById,
  ProductServiceUpdate,
} from "@jamalsoueidan/backend.services.product";
import { ControllerProps, ShopQuery } from "@jamalsoueidan/backend.types.api";

import {
  ProductServiceGetAllProps,
  ProductServiceGetAvailableStaffProps,
  ProductServiceGetByIdProps,
  ProductServiceUpdateBodyProps,
  ProductServiceUpdateQueryProps,
} from "@jamalsoueidan/backend.types.product";

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
