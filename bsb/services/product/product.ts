import { ScheduleModel } from "@jamalsoueidan/bsb.services.schedule";
import {
  ProductServiceGetAvailableStaffReturn,
  ProductServiceGetByIdProps,
  ProductServiceUpdateBodyProps,
  ProductServiceUpdateQueryProps,
  ShopQuery,
} from "@jamalsoueidan/bsb.types";
import { startOfDay } from "date-fns";
import mongoose from "mongoose";
import { ProductModel } from "./product.model";

export const ProductServiceGetById = async ({
  id,
  shop,
}: ProductServiceGetByIdProps & ShopQuery) => {
  const product = await ProductModel.findOne({
    _id: new mongoose.Types.ObjectId(id),
    shop,
    "staff.0": { $exists: false }, // if product contains zero staff, then just return the product, no need for aggreation
  });

  if (product) {
    return product;
  }

  const products = await ProductModel.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(id), shop },
    },
    {
      $unwind: { path: "$staff", preserveNullAndEmptyArrays: true },
    },
    {
      $lookup: {
        as: "staff.staff",
        foreignField: "_id",
        from: "Staff",
        localField: "staff.staff",
      },
    },
    {
      $unwind: {
        path: "$staff.staff",
      },
    },
    {
      $addFields: {
        "staff.staff.tag": "$staff.tag",
      },
    },
    {
      $addFields: {
        staff: "$staff.staff",
      },
    },
    { $sort: { "staff.fullname": 1 } },
    {
      $group: {
        _id: "$_id",
        product: { $first: "$$ROOT" },
        staff: { $push: "$staff" },
      },
    },
    {
      $addFields: {
        "product.staff": "$staff",
      },
    },
    { $replaceRoot: { newRoot: "$product" } },
  ]);

  return products.length > 0 ? products[0] : null;
};

export const ProductServiceUpdate = async (
  query: ProductServiceUpdateQueryProps & ShopQuery,
  body: ProductServiceUpdateBodyProps,
) => {
  const { staff, ...properties } = body;

  const newStaffier =
    staff?.map((s) => ({
      staff: s._id,
      tag: s.tag,
    })) || [];

  // turn active ON=true first time customer add staff to product
  const product = await ProductModel.findById(
    new mongoose.Types.ObjectId(query.id),
  ).lean();

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

// @description return all staff that don't belong yet to the product
export const ProductServiceGetAvailableStaff = (shop: string) =>
  ScheduleModel.aggregate<ProductServiceGetAvailableStaffReturn>([
    {
      // TODO: should we only show staff who have schedule after today?
      $match: {
        start: {
          $gte: startOfDay(new Date()),
        },
      },
    },
    {
      $group: {
        _id: {
          shop,
          staff: "$staff",
          tag: "$tag",
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [{ staff: "$_id.staff", tag: "$_id.tag" }],
        },
      },
    },
    {
      $group: {
        _id: "$staff",
        tags: { $push: "$tag" },
      },
    },
    {
      $project: {
        _id: "$_id",
        tags: "$tags",
      },
    },
    {
      $lookup: {
        as: "staffs",
        foreignField: "_id",
        from: "Staff",
        localField: "_id",
      },
    },
    {
      $unwind: "$staffs", // explode array
    },
    {
      $addFields: {
        "staffs.tags": "$tags",
      },
    },
    {
      $replaceRoot: {
        newRoot: "$staffs",
      },
    },
    { $sort: { fullname: 1 } },
  ]);
