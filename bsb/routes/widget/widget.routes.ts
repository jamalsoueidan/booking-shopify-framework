import { handleRoute } from "@jamalsoueidan/bsb.express.handle-route";
import { checkSchema } from "express-validator";
import { widgetAvailability, widgetStaff } from "./widget.controller";

export const widgetRouteStaff = {
  method: "get",
  middlewares: [
    checkSchema({
      productId: { isInt: true, notEmpty: true, toInt: true },
    }),
    handleRoute(widgetStaff),
  ],
  route: "/widget/staff",
};

export const widgetRouteAvailability = {
  method: "get",
  middlewares: [
    checkSchema({
      end: { isISO8601: true, notEmpty: true, toDate: true },
      productId: { isInt: true, notEmpty: true, toInt: true },
      start: { isISO8601: true, notEmpty: true, toDate: true },
    }),
    handleRoute(widgetAvailability),
  ],
  route: "/widget/availability",
};
