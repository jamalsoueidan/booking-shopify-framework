import { handleController } from "@jamalsoueidan/bsb.middlewares.handle-controller";
import { onlyAdmin } from "@jamalsoueidan/bsb.middlewares.roles";
import {
  isValidObject,
  validate,
} from "@jamalsoueidan/bsb.middlewares.validate";
import { checkSchema } from "express-validator";
import {
  staffCreateApp,
  staffGetAllApp,
  staffGetByIdApp,
  staffUpdateApp,
} from "./staff.application";
import {
  staffCreate,
  staffGetAll,
  staffGetById,
  staffUpdate,
} from "./staff.controller";

export const staffRouteGetAll = {
  method: "get",
  middlewares: [handleController(staffGetAllApp, staffGetAll)],
  route: "/staff",
};

export const staffRouteCreate = {
  method: "post",
  middlewares: [handleController(onlyAdmin, staffCreateApp, staffCreate)],
  route: "/staff",
};

export const staffRouteGetById = {
  method: "get",
  middlewares: [
    validate(
      checkSchema({
        _id: {
          custom: isValidObject,
          in: ["params"],
          notEmpty: true,
        },
      }),
    ),
    handleController(staffGetByIdApp, staffGetById),
  ],
  route: "/staff/:_id",
};

export const staffRouteUpdate = {
  method: "put",
  middlewares: [
    validate(
      checkSchema({
        _id: {
          custom: isValidObject,
          in: ["params"],
          notEmpty: true,
        },
      }),
    ),
    handleController(onlyAdmin, staffUpdateApp, staffUpdate),
  ],
  route: "/staff/:_id",
};
