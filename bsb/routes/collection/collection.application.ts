/* eslint-disable no-param-reassign */
import { AppControllerProps } from "@jamalsoueidan/bsb.types.api";
import { CollectionServiceGetAllProps } from "@jamalsoueidan/bsb.types.collection";

export const collectionGetAllApp = async ({
  query,
  session,
}: AppControllerProps<CollectionServiceGetAllProps>) => {
  query.group = session.group;
};
