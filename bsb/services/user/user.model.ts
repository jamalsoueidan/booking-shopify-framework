import mongoose, { Model } from "mongoose";
import { IUserDocument, IUserModel, UserSchema } from "./user.schema";

// eslint-disable-next-line @typescript-eslint/ban-types
export const UserModel: Model<IUserDocument, {}, {}, {}, IUserModel> =
  mongoose.models.user || mongoose.model<IUserDocument, IUserModel>("user", UserSchema, "User");
