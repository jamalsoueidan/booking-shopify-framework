import mongoose from "mongoose";
import { IProductDocument, IProductModel, ProductSchema } from "./product.schema";

export const ProductModel = mongoose.model<IProductDocument, IProductModel>("product", ProductSchema, "Product");
