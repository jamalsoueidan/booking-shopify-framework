import {
  CollectionServiceCreate,
  CollectionServiceDestroy,
  CollectionServiceGetAll,
} from "@jamalsoueidan/bsb.services.collection";
import {
  ControllerProps,
  ShopifyControllerProps,
} from "@jamalsoueidan/bsb.types.api";
import {
  CollectionServiceCreateBodyProps,
  CollectionServiceDestroyProps,
  CollectionServiceGetAllProps,
} from "@jamalsoueidan/bsb.types.collection";

export const collectionCreate = async ({
  body,
  session,
}: ShopifyControllerProps<null, CollectionServiceCreateBodyProps>) =>
  CollectionServiceCreate({ session }, body);

export const collectionDestroy = async ({
  query,
}: ShopifyControllerProps<CollectionServiceDestroyProps>) =>
  CollectionServiceDestroy(query);

export const collectionGetAll = ({
  query,
}: ControllerProps<CollectionServiceGetAllProps>) =>
  CollectionServiceGetAll(query);
