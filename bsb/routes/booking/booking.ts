import { handleRoute } from "@jamalsoueidan/bsb.express.handle-route";
import { checkSchema } from "express-validator";
import { BookingGetAll } from "./booking.routes";

export function BookingRouteGetAll() {
  return {
    method: "get",
    middlewares: [
      checkSchema({
        end: { isISO8601: true, notEmpty: true, toDate: true },
        start: { isISO8601: true, notEmpty: true, toDate: true },
      }),
      handleRoute(BookingGetAll),
    ],
    route: "/booking",
  };
}
