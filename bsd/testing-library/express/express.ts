/* eslint-disable @typescript-eslint/no-explicit-any */
import { Staff, StaffRole } from "@jamalsoueidan/bsb.types.staff";
import { shop } from "@jamalsoueidan/bsd.testing-library.mongodb";
import bodyParser from "body-parser";
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
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
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
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/*", (req: any, res: any, next: any) => {
    req.query.shop = shop;
    req.session = {
      _id: "a",
      group: staff.group,
      isAdmin: staff.role === StaffRole.admin,
      isOwner: staff.role === StaffRole.owner,
      isUser: staff.role === StaffRole.user,
      role: staff.role,
      shop,
      staff: staff._id.toString(),
    };
    next();
  });

  app[route.method](route.route, route.middlewares);

  return supertest(app);
};
