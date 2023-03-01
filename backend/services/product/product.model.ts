import mongoose, { Model } from "mongoose";
import { IProductDocument, IProductModel, ProductSchema } from "./product.schema";

// eslint-disable-next-line @typescript-eslint/ban-types
export const ProductModel: Model<IProductDocument, {}, {}, {}, IProductModel> =
  mongoose.models.product || mongoose.model<IProductDocument, IProductModel>("product", ProductSchema, "Product");
