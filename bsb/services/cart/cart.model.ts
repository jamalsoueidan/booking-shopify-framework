import mongoose from "mongoose";
import { CartSchema, ICartDocument, ICartModel } from "./cart.schema";

export const CartModel = mongoose.model<ICartDocument, ICartModel>("cart", CartSchema, "Cart");
