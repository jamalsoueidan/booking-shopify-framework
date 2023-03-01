import {
  CollectionServiceCreate,
  CollectionServiceDestroy,
  CollectionServiceGetAll,
} from "@jamalsoueidan/backend.services.collection";
import {
  ControllerProps,
  ShopifyControllerProps,
} from "@jamalsoueidan/backend.types.api";
import {
  CollectionServiceCreateBodyProps,
  CollectionServiceDestroyProps,
  CollectionServiceGetAllProps,
} from "@jamalsoueidan/backend.types.collection";

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
