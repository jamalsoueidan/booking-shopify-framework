import { Router } from "express";
import {
  staffRouteCreate,
  staffRouteGetAll,
  staffRouteGetById,
  staffRouteUpdate,
} from "./staff.routes";

const staffRouter = Router();

staffRouter[staffRouteCreate.method](
  staffRouteCreate.route,
  staffRouteCreate.middlewares,
);
staffRouter[staffRouteGetAll.method](
  staffRouteGetAll.route,
  staffRouteGetAll.middlewares,
);
staffRouter[staffRouteGetById.method](
  staffRouteGetById.route,
  staffRouteGetById.middlewares,
);
staffRouter[staffRouteUpdate.method](
  staffRouteUpdate.route,
  staffRouteUpdate.middlewares,
);

export * from "./staff.controller";
export * from "./staff.routes";
export { staffRouter };
