import { ShopQuery } from "@jamalsoueidan/bsb.types.api";
import { Staff, StaffBodyUpdate } from "@jamalsoueidan/bsb.types.staff";
import { StaffModel } from "./staff.model";

export const StaffServiceCreate = (doc: Omit<Staff, "_id">) => {
  const newStaff = new StaffModel(doc);
  return newStaff.save();
};

export const StaffServiceFindAll = (shop: string) => StaffModel.find({ shop });

interface StaffServiceFindOneProps
  extends Partial<Omit<Staff, "_id" | "_shop">> {
  _id: string;
  shop: string;
}

export const StaffServiceFindOne = (filter: StaffServiceFindOneProps) =>
  StaffModel.findOne(filter);

export const StaffServiceFindByIdAndUpdate = (_id, body: StaffBodyUpdate) =>
  StaffModel.findByIdAndUpdate(_id, body, {
    new: true,
  });

interface StaffServiceGetStaffIdsbyGroupProps extends ShopQuery {
  group: string;
}

export const StaffServiceGetStaffIdsbyGroup = async ({
  shop,
  group,
}: StaffServiceGetStaffIdsbyGroupProps) => {
  const users = await StaffModel.find({ group, shop }, "");
  return users.map((user) => user._id);
};
