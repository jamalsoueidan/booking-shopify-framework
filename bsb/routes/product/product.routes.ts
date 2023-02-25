import { body, checkSchema, param } from "express-validator";

import { onlyOwner } from "@jamalsoueidan/bsb.middlewares.roles";
import {
  isValidObject,
  validate,
} from "@jamalsoueidan/bsb.middlewares.validate";
import { handleController } from "@jamalsoueidan/pkg.bsb";
import { isValidObjectId } from "mongoose";
import {
  productGetAll,
  productGetAvailableStaff,
  productGetById,
  productUpdate,
} from "./product.controller";

export const productRouteGetAll = {
  method: "get",
  middlewares: [handleController(productGetAll)],
  route: "/products",
};

export const productRouteGetById = {
  method: "get",
  middlewares: [
    validate(
      checkSchema({
        id: {
          custom: isValidObject,
          in: ["params"],
          notEmpty: true,
        },
      }),
    ),
    handleController(productGetById),
  ],
  route: "/products/:id",
};

export const productRouteUpdate = {
  method: "put",
  middlewares: [
    validate(
      param("id")
        .custom((value) => isValidObjectId(value))
        .withMessage("not valid objectId"),
      body("_id").isEmpty(),
      body("shop").isEmpty(),
      body("collectionId").isEmpty(),
      body("productId").isEmpty(),
    ),
    handleController(onlyOwner, productUpdate),
  ],
  route: "/products/:id",
};

export const productRouteGetAvailableStaff = {
  method: "get",
  middlewares: [handleController(onlyOwner, productGetAvailableStaff)],
  route: "/products/staff/get-available",
};
