import { ShopQuery } from "@jamalsoueidan/bsb.types.api";
import {
  Staff,
  StaffBodyUpdate,
  StaffServiceGetStaffIdsbyGroupProps,
  StaffServiceLoginProps,
} from "@jamalsoueidan/bsb.types.staff";
import bcrypt from "bcryptjs";
import generator from "generate-password";
import { StaffModel } from "./staff.model";
import { IStaffDocument } from "./staff.schema";

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

export const StaffServiceGetStaffIdsbyGroup = async ({
  shop,
  group,
}: StaffServiceGetStaffIdsbyGroupProps & ShopQuery) => {
  const users = await StaffModel.find({ group, shop }, "");
  return users.map((user) => user._id);
};

export const StaffServiceCreateNewPassword = async (staff: IStaffDocument) => {
  const password = generator.generate({
    length: 6,
    numbers: true,
    symbols: false,
    uppercase: false,
  });

  // eslint-disable-next-line no-param-reassign
  staff.password = password;
  staff.save();
  return password;
};

export const StaffServiceLogin = async ({
  shop,
  identification,
  password,
}: StaffServiceLoginProps & ShopQuery) => {
  const staff = await StaffModel.findOne({
    $or: [{ phone: identification }, { email: identification }],
    active: true,
    shop,
  });

  if (staff) {
    const correctPassword = await bcrypt.compare(password, staff.password);
    if (correctPassword) {
      return staff;
    }
  }
  return null;
};
