import mongoose from "mongoose";
import { IStaffDocument, IStaffModel, StaffSchema } from "./staff.schema";

export const StaffModel = mongoose.model<IStaffDocument, IStaffModel>("staff", StaffSchema, "Staff");
