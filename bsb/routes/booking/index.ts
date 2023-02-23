import { Router } from "express";
import {
  bookingRouteCreate,
  bookingRouteGetAll,
  bookingRouteGetById,
  bookingRouteUpdate,
} from "./booking.routes";

const bookingRouter = Router();

bookingRouter[bookingRouteGetAll.method](
  bookingRouteGetAll.route,
  bookingRouteGetAll.middlewares,
);
bookingRouter[bookingRouteCreate.method](
  bookingRouteCreate.route,
  bookingRouteCreate.middlewares,
);
bookingRouter[bookingRouteUpdate.method](
  bookingRouteUpdate.route,
  bookingRouteUpdate.middlewares,
);
bookingRouter[bookingRouteGetById.method](
  bookingRouteGetById.route,
  bookingRouteGetById.middlewares,
);

export * from "./booking.routes";
export { bookingRouter };
