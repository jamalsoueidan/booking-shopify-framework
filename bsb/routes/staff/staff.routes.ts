import { handleController } from "@jamalsoueidan/bsb.middlewares.handle-controller";
import { onlyAdmin } from "@jamalsoueidan/bsb.middlewares.roles";
import { validate } from "@jamalsoueidan/bsb.middlewares.validate";
import { isValidObject } from "@jamalsoueidan/bsb.middlewares.validate/validate";
import { checkSchema } from "express-validator";
import {
  createStaffApp,
  getAllStaffApp,
  getStaffByIdApp,
  updateStaffApp,
} from "./staff.application";
import {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
} from "./staff.controller";

export const staffRouteGetAll = {
  method: "get",
  middlewares: [handleController(getAllStaffApp, getAllStaff)],
  route: "/staff",
};

export const staffRouteCreate = {
  method: "post",
  middlewares: [handleController(onlyAdmin, createStaffApp, createStaff)],
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
    handleController(getStaffByIdApp, getStaffById),
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
    handleController(onlyAdmin, updateStaffApp, updateStaff),
  ],
  route: "/staff/:_id",
};
