import mongoose, { Model } from "mongoose";
import { CartSchema, ICartDocument, ICartModel } from "./cart.schema";

// eslint-disable-next-line @typescript-eslint/ban-types
export const CartModel: Model<ICartDocument, {}, {}, {}, ICartModel> =
  mongoose.models.cart || mongoose.model<ICartDocument, ICartModel>("cart", CartSchema, "Cart");
