import { Router } from "express";
import * as routes from "./staff.routes";

const staffRouter = Router();

const keys = Object.keys(routes);
keys.forEach((k) => {
  // eslint-disable-next-line import/namespace
  const route = routes[k];
  staffRouter[route.method](route.route, route.middlewares);
});

export * from "./staff.controller";
export * from "./staff.routes";
export { staffRouter };
