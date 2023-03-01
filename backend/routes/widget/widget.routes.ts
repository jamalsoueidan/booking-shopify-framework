import { handleController } from "@jamalsoueidan/backend.middlewares.handle-controller";
import { validate } from "@jamalsoueidan/backend.middlewares.validate";
import { checkSchema } from "express-validator";
import { widgetAvailabiliyApp, widgetStaffApp } from "./widget.application";
import {
  widgetAvailability,
  widgetSettings,
  widgetStaff,
} from "./widget.controller";

export const widgetRouteStaff = {
  method: "get",
  middlewares: [
    validate(
      checkSchema({
        productId: { isInt: true, notEmpty: true, toInt: true },
      }),
    ),
    handleController(widgetStaffApp, widgetStaff),
  ],
  route: "/widget/staff",
};

export const widgetRouteAvailability = {
  method: "get",
  middlewares: [
    validate(
      checkSchema({
        end: { isISO8601: true, notEmpty: true, toDate: true },
        productId: { isInt: true, notEmpty: true, toInt: true },
        start: { isISO8601: true, notEmpty: true, toDate: true },
      }),
    ),
    handleController(widgetAvailabiliyApp, widgetAvailability),
  ],
  route: "/widget/availability",
};

export const widgetRouteSettings = {
  method: "get",
  middlewares: [handleController(widgetSettings)],
  route: "/widget/settings",
};
