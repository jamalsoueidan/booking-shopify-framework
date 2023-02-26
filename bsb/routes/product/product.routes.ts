import { body, checkSchema } from "express-validator";

import { onlyAdmin } from "@jamalsoueidan/bsb.middlewares.roles";
import {
  isValidObject,
  validate,
} from "@jamalsoueidan/bsb.middlewares.validate";
import { handleController } from "@jamalsoueidan/pkg.bsb";
import {
  productGetAllApp,
  productGetAvailableStaffApp,
  productUpdateApp,
} from "./product.application";
import {
  productGetAll,
  productGetAvailableStaff,
  productGetById,
  productUpdate,
} from "./product.controller";
import { validStaffArray } from "./product.validator";

export const productRouteGetAll = {
  method: "get",
  middlewares: [handleController(productGetAllApp, productGetAll)],
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
      checkSchema({
        id: {
          custom: isValidObject,
          in: ["params"],
          notEmpty: true,
        },
      }),
      body("_id").isEmpty(),
      body("shop").isEmpty(),
      body("collectionId").isEmpty(),
      body("productId").isEmpty(),
      body("staff").custom(validStaffArray),
    ),
    handleController(onlyAdmin, productUpdateApp, productUpdate),
  ],
  route: "/products/:id",
};

export const productRouteGetAvailableStaff = {
  method: "get",
  middlewares: [
    handleController(
      onlyAdmin,
      productGetAvailableStaffApp,
      productGetAvailableStaff,
    ),
  ],
  route: "/products/staff/get-available",
};
