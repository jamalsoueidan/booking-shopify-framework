/* eslint-disable @typescript-eslint/no-explicit-any */
import { Staff } from "@jamalsoueidan/bsb.types.staff";
import { shop } from "@jamalsoueidan/bsd.testing-library.mongodb";
import express, { Request, Response } from "express";
import supertest from "supertest";

export type Middleware = (
  req: Request,
  res: Response,
  next: express.NextFunction,
) => Promise<any>;

export interface Route {
  method: string;
  route: string | RegExp;
  middlewares: any[];
}

export const createShopifyExpress = (route: Route) => {
  const app = express();
  app.use("/*", (req: any, res: any, next: any) => {
    req.query.shop = shop;
    req.session = {
      accessToken: "a",
      id: "",
      isOnline: true,
      shop,
      state: "a",
    };
    next();
  });

  app[route.method](route.route, route.middlewares);

  return supertest(app);
};

export const createAppExpress = (route: Route, staff: Staff) => {
  const app = express();
  app.use("/*", (req: any, res: any, next: any) => {
    req.query.shop = shop;
    req.session = {
      _id: "a",
      group: staff.group,
      role: staff.role,
      shop,
      staff: staff._id,
    };
    next();
  });

  app[route.method](route.route, route.middlewares);

  return supertest(app);
};
