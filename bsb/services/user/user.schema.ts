import { User } from "@jamalsoueidan/bsb.types.user";
import bcrypt from "bcryptjs";
import mongoose, { Document, Model, Types } from "mongoose";

export interface IUser extends Omit<User, "_id" | "staff"> {
  staff: Types.ObjectId;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {}

export const UserSchema = new mongoose.Schema<IUserDocument, IUserModel>({
  email: { index: true, required: true, type: String },
  language: {
    default: "da",
    type: String,
  },
  password: { required: true, type: String },
  phone: { index: true, required: true, type: String },
  role: {
    default: 1,
    type: Number,
  },
  shop: {
    index: true,
    required: true,
    type: String,
  },
  staff: {
    ref: "Staff",
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
  },
  timeZone: {
    default: "Europe/Copenhagen",
    type: String,
  },
});

UserSchema.pre("save", async function save(next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});
