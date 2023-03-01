import { handleController } from "@jamalsoueidan/backend.middlewares.handle-controller";
import {
  isValidObject,
  validate,
} from "@jamalsoueidan/backend.middlewares.validate";
import { checkSchema } from "express-validator";
import {
  bookingCreateApp,
  bookingGetAllApp,
  bookingGetByIdApp,
  bookingUpdateApp,
} from "./booking.application";
import {
  bookingCreate,
  bookingGetAll,
  bookingGetById,
  bookingUpdate,
} from "./booking.controller";

export const bookingRouteGetAll = {
  method: "get",
  middlewares: [
    validate(
      checkSchema({
        end: { isISO8601: true, notEmpty: true, toDate: true },
        start: { isISO8601: true, notEmpty: true, toDate: true },
      }),
    ),
    handleController(bookingGetAllApp, bookingGetAll),
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
    handleController(bookingGetByIdApp, bookingGetById),
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
    handleController(bookingCreateApp, bookingCreate),
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
    handleController(bookingUpdateApp, bookingUpdate),
  ],
  route: "/bookings/:_id",
};
