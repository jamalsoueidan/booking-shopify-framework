import {
  Staff,
  StaffRole,
  StaffRoleValues,
} from "@jamalsoueidan/bsb.types.staff";
import bcrypt from "bcryptjs";
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
  language: {
    default: "da",
    required: true,
    type: String,
  },
  password: { default: "12345678", type: String },
  phone: { required: true, type: String },
  position: { required: true, type: String }, // makeup? hair?
  postal: {
    index: true,
    required: true,
    type: Number,
  },
  role: {
    default: StaffRole.user,
    enum: StaffRoleValues,
    required: true,
    type: Number,
  },
  shop: {
    index: true,
    required: true,
    type: String,
  },
  timeZone: {
    default: "Europe/Copenhagen",
    required: true,
    type: String,
  },
});

StaffSchema.pre("save", async function save(next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.password = hash;
    return next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return next(err);
  }
});
