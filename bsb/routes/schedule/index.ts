import { Router } from "express";
import {
  scheduleRouteCreate,
  scheduleRouteCreateGroup,
  scheduleRouteDestroy,
  scheduleRouteDestroyGroup,
  scheduleRouteGetAll,
  scheduleRouteUpdate,
  scheduleRouteUpdateGroup,
} from "./schedule.routes";

const scheduleRouter = Router();

scheduleRouter[scheduleRouteGetAll.method](
  scheduleRouteGetAll.route,
  scheduleRouteGetAll.middlewares,
);

scheduleRouter[scheduleRouteCreate.method](
  scheduleRouteCreate.route,
  scheduleRouteCreate.middlewares,
);

scheduleRouter[scheduleRouteUpdate.method](
  scheduleRouteUpdate.route,
  scheduleRouteUpdate.middlewares,
);

scheduleRouter[scheduleRouteDestroy.method](
  scheduleRouteDestroy.route,
  scheduleRouteDestroy.middlewares,
);

scheduleRouter[scheduleRouteCreateGroup.method](
  scheduleRouteCreateGroup.route,
  scheduleRouteCreateGroup.middlewares,
);

scheduleRouter[scheduleRouteUpdateGroup.method](
  scheduleRouteUpdateGroup.route,
  scheduleRouteUpdateGroup.middlewares,
);

scheduleRouter[scheduleRouteDestroyGroup.method](
  scheduleRouteDestroyGroup.route,
  scheduleRouteDestroyGroup.middlewares,
);

export * from "./schedule.routes";
export { scheduleRouter };
