import {
  AppSession,
  isApplicationSession as sessionIsApplication,
} from "@jamalsoueidan/bsb.types.api";
import { ShopifySession } from "@jamalsoueidan/bsb.types.shopify-session";
import { Request, Response } from "express";

export interface SessionRequest extends Request {
  session: ShopifySession | AppSession;
}

export const handleController =
  (...args) =>
  async (req: SessionRequest, res: Response) => {
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
        if (sessionIsApplication(req.session)) {
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
