/* eslint-disable no-param-reassign */
import { AppControllerProps } from "@jamalsoueidan/backend.types.api";
import { CollectionServiceGetAllProps } from "@jamalsoueidan/backend.types.collection";

export const collectionGetAllApp = async ({
  query,
  session,
}: AppControllerProps<CollectionServiceGetAllProps>) => {
  query.group = session.group;
};
