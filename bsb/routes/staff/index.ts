import { Router } from "express";
import {
  staffRouteCreate,
  staffRouteGetAll,
  staffRouteGetById,
  staffRouteUpdate,
} from "./staff.routes";

const bookingRouter = Router();

bookingRouter[staffRouteCreate.method](
  staffRouteCreate.route,
  staffRouteCreate.middlewares,
);
bookingRouter[staffRouteGetAll.method](
  staffRouteGetAll.route,
  staffRouteGetAll.middlewares,
);
bookingRouter[staffRouteGetById.method](
  staffRouteGetById.route,
  staffRouteGetById.middlewares,
);
bookingRouter[staffRouteUpdate.method](
  staffRouteUpdate.route,
  staffRouteUpdate.middlewares,
);

export { bookingRouter };
