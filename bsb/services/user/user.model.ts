import mongoose from "mongoose";
import { IUserDocument, IUserModel, UserSchema } from "./user.schema";

export const UserModel = mongoose.model<IUserDocument, IUserModel>("User", UserSchema, "User");
