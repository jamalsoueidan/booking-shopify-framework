import { Router } from "express";
import * as routes from "./product.routes";

const productRouter = Router();

const keys = Object.keys(routes);
keys.forEach((k) => {
  // eslint-disable-next-line import/namespace
  const route = routes[k];
  productRouter[route.method](route.route, route.middlewares);
});

export * from "./product.routes";
export { productRouter };
