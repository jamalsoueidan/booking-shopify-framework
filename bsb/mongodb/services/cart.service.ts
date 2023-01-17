import { CartModel, ICartModel } from "@jamalsoueidan/bsb.mongodb.models";
import { CartGetByStaff } from "@jamalsoueidan/bsb.mongodb.types";
import { Aggregate, Types } from "mongoose";

interface GetCartsByStaffierProps
  extends Omit<ICartModel, "createdAt" | "staff"> {
  staff: Types.ObjectId[];
}

export const CartServiceGetByStaff = ({
  shop,
  staff,
  start,
  end,
}: GetCartsByStaffierProps): Aggregate<Array<CartGetByStaff>> => {
  return CartModel.aggregate([
    {
      $match: {
        shop,
        staff: {
          $in: staff,
        },
        $or: [
          {
            start: {
              $gte: start,
            },
          },
          {
            end: {
              $gte: start,
            },
          },
        ],
      },
    },
    {
      $match: {
        $or: [
          {
            start: {
              $lt: end,
            },
          },
          {
            end: {
              $lt: end,
            },
          },
        ],
      },
    },
  ]);
};
