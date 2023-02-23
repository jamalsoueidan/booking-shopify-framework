import {
  StaffServiceCreate,
  StaffServiceFindAll,
  StaffServiceFindByIdAndUpdate,
  StaffServiceFindOne,
} from "@jamalsoueidan/bsb.services.staff";
import { ControllerProps, ShopQuery } from "@jamalsoueidan/bsb.types.api";
import {
  StaffBodyCreate,
  StaffBodyUpdate,
  StaffServiceGetAllProps,
  StaffServiceGetStaffByIdQuery,
  StaffServiceUpdateQuery,
} from "@jamalsoueidan/bsb.types.staff";

export const staffGetAll = ({
  query,
}: ControllerProps<StaffServiceGetAllProps>) => StaffServiceFindAll(query);

export const staffCreate = ({
  query,
  body,
}: ControllerProps<ShopQuery, StaffBodyCreate>) => {
  const { shop } = query;
  return StaffServiceCreate({ shop, ...body });
};

export const staffGetById = async ({
  query,
}: ControllerProps<StaffServiceGetStaffByIdQuery>) => {
  const staff = await StaffServiceFindOne(query);
  if (!staff) {
    throw "staff not exist";
  }
  return staff;
};

export const staffUpdate = ({
  body,
  query,
}: ControllerProps<StaffServiceUpdateQuery, StaffBodyUpdate>) =>
  StaffServiceFindByIdAndUpdate(query._id, body);
