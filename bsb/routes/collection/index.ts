import { Router } from "express";
import * as routes from "./collection.routes";

const collectionRouter = Router();

const keys = Object.keys(routes);
keys.forEach((k) => {
  // eslint-disable-next-line import/namespace
  const route = routes[k];
  collectionRouter[route.method](route.route, route.middlewares);
});

export * from "./collection.routes";
export { collectionRouter };
