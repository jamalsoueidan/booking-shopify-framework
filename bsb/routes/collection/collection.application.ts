import { AppControllerProps } from "@jamalsoueidan/bsb.types.api";
import { CollectionServiceGetAllProps } from "@jamalsoueidan/bsb.types.collection";
import { StaffRole } from "@jamalsoueidan/bsb.types.staff";

export const collectionGetAllApp = async ({
  query,
  session,
}: AppControllerProps<CollectionServiceGetAllProps>) => {
  if (session.role > StaffRole.owner) {
    query.group = session.group;
  }
};
