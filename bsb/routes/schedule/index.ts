import { Router } from "express";

import * as routes from "./schedule.routes";

const scheduleRouter = Router();

const keys = Object.keys(routes);
keys.forEach((k) => {
  // eslint-disable-next-line import/namespace
  const route = routes[k];
  scheduleRouter[route.method](route.route, route.middlewares);
});

export * from "./schedule.routes";
export { scheduleRouter };
