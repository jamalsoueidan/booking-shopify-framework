import { StaffModel } from "@jamalsoueidan/bsb.mongodb.models";
import { Staff, StaffBodyUpdate } from "@jamalsoueidan/bsb.mongodb.types";

export const StaffServiceCreate = (doc: Omit<Staff, "_id">) => {
  const newStaff = new StaffModel(doc);
  return newStaff.save();
};

export const StaffServiceFindAll = (shop: string) => {
  return StaffModel.find({ shop });
};

interface StaffServiceFindOneProps
  extends Partial<Omit<Staff, "_id" | "_shop">> {
  _id: string;
  shop: string;
}

export const StaffServiceFindOne = (filter: StaffServiceFindOneProps) => {
  return StaffModel.findOne(filter);
};

export const StaffServiceFindByIdAndUpdate = (_id, body: StaffBodyUpdate) => {
  return StaffModel.findByIdAndUpdate(_id, body, {
    new: true,
  });
};
