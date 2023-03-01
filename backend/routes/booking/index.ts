import { Router } from "express";
import * as routes from "./booking.routes";

const bookingRouter = Router();

const keys = Object.keys(routes);
keys.forEach((k) => {
  // eslint-disable-next-line import/namespace
  const route = routes[k];
  bookingRouter[route.method](route.route, route.middlewares);
});

export * from "./booking.routes";
export { bookingRouter };
