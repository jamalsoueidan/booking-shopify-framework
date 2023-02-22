import { handleController } from "@jamalsoueidan/bsb.middlewares.handle-controller";
import { validate } from "@jamalsoueidan/bsb.middlewares.validate";
import { isValidObject } from "@jamalsoueidan/bsb.middlewares.validate/validate";
import { checkSchema } from "express-validator";
import {
  createApp,
  getAllApp,
  getByIdApp,
  updateApp,
} from "./booking.application";
import { create, getAll, getById, update } from "./booking.controller";

export const bookingRouteGetAll = {
  method: "get",
  middlewares: [
    validate(
      checkSchema({
        end: { isISO8601: true, notEmpty: true, toDate: true },
        start: { isISO8601: true, notEmpty: true, toDate: true },
      }),
    ),
    handleController(getAllApp, getAll),
  ],
  route: "/bookings",
};

export const bookingRouteGetById = {
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
    handleController(getByIdApp, getById),
  ],
  route: "/bookings/:_id",
};

export const bookingRouteCreate = {
  method: "post",
  middlewares: [
    validate(
      checkSchema({
        customerId: {
          in: ["body"],
          notEmpty: true,
          toInt: true,
        },
        end: { in: ["body"], isISO8601: true, notEmpty: true, toDate: true },
        productId: {
          in: ["body"],
          notEmpty: true,
          toInt: true,
        },
        staff: {
          custom: isValidObject,
          in: ["body"],
          notEmpty: true,
        },
        start: { in: ["body"], isISO8601: true, notEmpty: true, toDate: true },
      }),
    ),
    handleController(createApp, create),
  ],
  route: "/bookings",
};

export const bookingRouteUpdate = {
  method: "put",
  middlewares: [
    validate(
      checkSchema({
        _id: {
          custom: isValidObject,
          in: ["params"],
          notEmpty: true,
        },
        customerId: {
          in: ["body"],
          notEmpty: true,
          toInt: true,
        },
        end: { in: ["body"], isISO8601: true, notEmpty: true, toDate: true },
        productId: {
          in: ["body"],
          notEmpty: true,
          toInt: true,
        },
        start: { in: ["body"], isISO8601: true, notEmpty: true, toDate: true },
      }),
    ),
    handleController(updateApp, update),
  ],
  route: "/bookings/:_id",
};
