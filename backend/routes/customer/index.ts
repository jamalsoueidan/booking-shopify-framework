import { Router } from "express";
import * as routes from "./customer.routes";

const customerRouter = Router();

const keys = Object.keys(routes);
keys.forEach((k) => {
  // eslint-disable-next-line import/namespace
  const route = routes[k];
  customerRouter[route.method](route.route, route.middlewares);
});

export * from "./customer.routes";
export { customerRouter };
