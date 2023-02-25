import { handleController } from "@jamalsoueidan/bsb.middlewares.handle-controller";
import { onlyOwner } from "@jamalsoueidan/bsb.middlewares.roles";
import {
  isValidObject,
  validate,
} from "@jamalsoueidan/bsb.middlewares.validate";
import { body, checkSchema } from "express-validator";
import { collectionGetAllApp } from "./collection.application";
import {
  collectionCreate,
  collectionDestroy,
  collectionGetAll,
} from "./collection.controller";

export const collectionRouteGetAll = {
  method: "get",
  middlewares: [handleController(collectionGetAllApp, collectionGetAll)],
  route: "/collections",
};

export const collectionRouteCreate = {
  method: "post",
  middlewares: [
    validate(body("selections").notEmpty().isArray({ min: 1 })),
    handleController(onlyOwner, collectionCreate),
  ],
  route: "/collections",
};

export const collectionRouteDestroy = {
  method: "delete",
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
    handleController(onlyOwner, collectionDestroy),
  ],
  route: "/collections/:id",
};
