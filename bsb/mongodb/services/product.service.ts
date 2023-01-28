import { ProductModel } from "@jamalsoueidan/bsb.mongodb.models";
import { Product, ProductUpdateBody } from "@jamalsoueidan/bsb.mongodb.types";
import mongoose from "mongoose";

interface UpdateQuery {
  shop: string;
  id: string;
}

export const ProductUpdate = async ({
  query,
  body,
}: {
  query: UpdateQuery;
  body: ProductUpdateBody;
}): Promise<Product> => {
  const { staff, ...properties } = body;

  const newStaffier =
    staff?.map((s) => {
      return {
        staff: s._id,
        tag: s.tag,
      };
    }) || [];

  // turn active ON=true first time customer add staff to product
  const product = await ProductModel.findById(
    new mongoose.Types.ObjectId(query.id)
  ).lean();

  let {active} = properties;
  if (product?.staff.length === 0 && newStaffier.length > 0) {
    active = true;
  }
  if (newStaffier.length === 0) {
    active = false;
  }

  return await ProductModel.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(query.id),
      shop: query.shop,
    },
    {
      $set: { ...properties, staff: newStaffier, active },
    },
    {
      new: true,
    }
  ).lean();
};
