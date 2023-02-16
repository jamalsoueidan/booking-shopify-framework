import { Product, Tag } from "@jamalsoueidan/bsb.types";
import { Document, Model, Schema, Types } from "mongoose";

type ProductStaff = {
  staff: Types.ObjectId;
  tag: Tag;
};

export interface IProduct extends Omit<Product<ProductStaff>, "_id"> {}

export interface IProductDocument extends IProduct, Document {}

export interface IProductModel extends Model<IProductDocument> {}

export const ProductSchema = new Schema<IProductDocument, IProductModel>({
  active: {
    default: false,
    index: true,
    type: Boolean,
  },
  buffertime: {
    default: 0,
    type: Number,
  },
  collectionId: {
    index: true,
    required: true,
    type: Number,
  },
  duration: {
    default: 60,
    type: Number,
  },
  hidden: {
    default: false,
    index: true,
    type: Boolean,
  },
  imageUrl: String,
  productId: {
    index: true,
    required: true,
    type: Number,
  },
  shop: {
    index: true,
    required: true,
    type: String,
  },
  staff: [
    {
      staff: {
        ref: "Staff",
        required: true,
        type: Schema.Types.ObjectId,
      },
      tag: {
        enum: Object.values(Tag),
        required: true,
        type: String,
      },
    },
  ],
  title: String,
});
