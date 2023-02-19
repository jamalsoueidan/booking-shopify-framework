import { Staff } from "@jamalsoueidan/bsb.types.staff";
import mongoose, { Document, Model } from "mongoose";

export interface IStaff extends Omit<Staff, "_id"> {}

export interface IStaffDocument extends IStaff, Document {}

export interface IStaffModel extends Model<IStaffDocument> {}

export const StaffSchema = new mongoose.Schema<IStaffDocument, IStaffModel>({
  active: { default: true, type: Boolean },
  address: String,
  avatar: { required: true, type: String },
  email: {
    type: String,
    unique: true,
  },
  fullname: { required: true, type: String },
  group: {
    default: "all", // should be changed later to null, nobody can see each other till they are part of group
    index: true,
    type: String,
  },
  phone: { required: true, type: String },
  position: { required: true, type: String },
  postal: {
    index: true,
    required: true,
    type: Number,
  },
  shop: {
    index: true,
    required: true,
    type: String,
  },
});
