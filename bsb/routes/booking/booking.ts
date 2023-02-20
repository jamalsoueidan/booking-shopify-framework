import { handleRoute } from "@jamalsoueidan/bsb.express.handle-route";
import { CustomValidator, checkSchema } from "express-validator";
import { ValidatorsSchema } from "express-validator/src/middlewares/schema";
import { isValidObjectId } from "mongoose";
import { create, getAll, getById, update } from "./booking.routes";

const isValidObject: ValidatorsSchema["custom"] = {
  errorMessage: "not valid objectId",
  options: (value: CustomValidator) => isValidObjectId(value),
};

export const bookingRouteGetAll = {
  method: "get",
  middlewares: [
    checkSchema({
      end: { isISO8601: true, notEmpty: true, toDate: true },
      start: { isISO8601: true, notEmpty: true, toDate: true },
    }),
    handleRoute(getAll),
  ],
  route: "/bookings",
};

export const bookingRouteGetById = {
  method: "get",
  middlewares: [
    checkSchema({
      _id: {
        custom: isValidObject,
        in: ["params"],
        notEmpty: true,
      },
      end: { in: ["body"], isISO8601: true, notEmpty: true, toDate: true },
      start: { in: ["body"], isISO8601: true, notEmpty: true, toDate: true },
    }),
    handleRoute(getById),
  ],
  route: "/bookings/:_id",
};

export const bookingRouteCreate = {
  method: "post",
  middlewares: [
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
    handleRoute(create),
  ],
  route: "/bookings",
};

export const bookingRouteUpdate = {
  method: "put",
  middlewares: [
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
    handleRoute(update),
  ],
  route: "/bookings/:_id",
};
