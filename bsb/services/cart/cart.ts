import { Types } from "mongoose";
import { CartModel } from "./cart.model";
import { ICart } from "./cart.schema";

interface GetCartsByStaffierProps extends Omit<ICart, "createdAt" | "staff"> {
  staff: Types.ObjectId[];
}

export const CartServiceGetByStaff = ({ shop, staff, start, end }: GetCartsByStaffierProps) =>
  CartModel.aggregate<ICart>([
    {
      $match: {
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
        shop,
        staff: {
          $in: staff,
        },
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
