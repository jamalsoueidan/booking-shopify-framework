import { ProductUpdateBody } from "@jamalsoueidan/bsb.types";
import mongoose from "mongoose";
import { ProductModel } from "./product.model";

interface UpdateQuery {
  shop: string;
  id: string;
}

export const ProductUpdate = async ({ query, body }: { query: UpdateQuery; body: ProductUpdateBody }) => {
  const { staff, ...properties } = body;

  const newStaffier =
    staff?.map((s) => ({
      staff: s._id,
      tag: s.tag,
    })) || [];

  // turn active ON=true first time customer add staff to product
  const product = await ProductModel.findById(new mongoose.Types.ObjectId(query.id)).lean();

  let { active } = properties;
  if (product?.staff.length === 0 && newStaffier.length > 0) {
    active = true;
  }
  if (newStaffier.length === 0) {
    active = false;
  }

  return ProductModel.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(query.id),
      shop: query.shop,
    },
    {
      $set: { ...properties, active, staff: newStaffier },
    },
    {
      new: true,
    },
  ).lean();
};
