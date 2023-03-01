import { Cart } from "@jamalsoueidan/backend.types.cart";
import mongoose, { Model, Types } from "mongoose";

export interface ICart extends Omit<Cart, "_id" | "staff"> {
  staff: Types.ObjectId;
}

export interface ICartDocument extends ICart, Document {}

export interface ICartModel extends Model<ICartDocument> {}

export const CartSchema = new mongoose.Schema<ICartDocument, ICartModel>({
  cartId: {
    index: true,
    required: true,
    type: String,
  },
  createdAt: {
    default: Date.now,
    expires: "15m",
    type: Date,
  },
  end: {
    index: true,
    required: true,
    type: Date,
  },
  shop: {
    index: true,
    required: true,
    type: String,
  },
  staff: {
    ref: "staff",
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  start: {
    index: true,
    required: true,
    type: Date,
  },
});
