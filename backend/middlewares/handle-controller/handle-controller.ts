import {
  AppSession,
  isApplicationSession,
} from "@jamalsoueidan/backend.types.api";
import { ShopifySession } from "@jamalsoueidan/backend.types.shopify-session";
import { StaffRole } from "@jamalsoueidan/backend.types.staff";
import { Request, Response } from "express";

// https://plusreturn.com/blog/how-to-extend-express-request-interface-in-typescript/
declare module "express-serve-static-core" {
  interface Request {
    session: ShopifySession | AppSession;
  }
}

export const handleController =
  (...args: any[]) =>
  async (req: Request, res: Response) => {
    const object = {
      body: req.body,
      query: {
        shop: req.query.shop || req.session?.shop,
        ...req.query,
        ...req.params,
      },
      session: req.session,
    };

    try {
      if (args.length > 1) {
        if (
          isApplicationSession(req.session) &&
          req.session.role > StaffRole.owner // only run these methods for admin and the rest, not owner
        ) {
          let i = 0;
          const len = args.length - 1;
          for (; i < len; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            await args[i](object);
          }
        }
      }

      const controller = args[args.length - 1];
      res.status(200).json({
        payload: await controller(object),
        success: true,
      });
    } catch (error) {
      res.status(400).json({
        error,
        success: false,
      });
    }
  };
