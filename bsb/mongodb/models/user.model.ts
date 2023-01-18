import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "@jamalsoueidan/bsb.mongodb.types";

const { Schema } = mongoose;

export interface IUserModel extends Omit<User, "_id">, Document {}

export const UserSchema = new Schema({
  shop: {
    type: String,
    required: true,
    index: true,
  },
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
    required: true,
    unique: true,
  },
  email: { type: String, index: true, required: true },
  phone: { type: String, index: true, required: true },
  password: { type: String, required: true },
  language: {
    type: String,
    default: "da",
  },
  timeZone: {
    type: String,
    default: "Europe/Copenhagen",
  },
  role: {
    type: Number,
    default: 1,
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

export const UserModel = mongoose.model<IUserModel>("User", UserSchema, "User");
