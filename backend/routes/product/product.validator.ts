import { ProductServiceUpdateBodyStaffProperty } from "@jamalsoueidan/backend.types.product";
import { TagKeys } from "@jamalsoueidan/backend.types.tag";
import { isValidObjectId } from "mongoose";

export const validStaffArray = (
  staffier: Array<ProductServiceUpdateBodyStaffProperty>,
) => {
  const found = staffier?.find(
    (staff) => !isValidObjectId(staff._id) || !TagKeys.includes(staff.tag),
  );
  if (found) {
    return Promise.reject(new Error("Staff is invalid"));
  }
  return staffier;
};
