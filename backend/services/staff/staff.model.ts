import mongoose, { Model } from "mongoose";
import { IStaffDocument, IStaffModel, StaffSchema } from "./staff.schema";

// eslint-disable-next-line @typescript-eslint/ban-types
export const StaffModel: Model<IStaffDocument, {}, {}, {}, IStaffModel> =
  mongoose.models.staff || mongoose.model<IStaffDocument, IStaffModel>("staff", StaffSchema, "Staff");
