/* eslint-disable no-console */
import { ShopifySessionModel } from "@jamalsoueidan/bsb.services.shopify-session";
import {
  connect,
  createBooking,
  createProduct,
  createStaffWithScheduleAndUpdateProduct,
  shop,
} from "@jamalsoueidan/bsd.testing-library.mongodb";
import Application from "express";

import { bookingRouter } from "@jamalsoueidan/bsb.routes.booking";
import { widgetRouter } from "@jamalsoueidan/bsb.routes.widget";
import { Tag } from "@jamalsoueidan/bsb.types.tag";
import { getPort } from "./get-port";

export const expressApp = async () => {
  const isExternal = typeof process.env.MODE === "string";

  connect();

  ShopifySessionModel.create({
    accessToken: "secret",
    isOnline: true,
    scope: "read,write",
    shop,
  });

  const productId = 123456789;
  const product = await createProduct({ productId });
  const { staff } = await createStaffWithScheduleAndUpdateProduct({
    product,
    tag: Tag.all_day,
  });

  await createBooking({ productId, staff: staff._id });

  console.log();

  const app = Application();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  app.use(async (req: any, res: any, next: any) => {
    req.query.shop = shop;

    req.session = await ShopifySessionModel.findOne({
      shop: req.query.shop,
    });

    if (isExternal) {
      req.session = {
        group: staff.group,
        role: staff.role,
        staff: staff._id.toString(),
      };
    }
    next();
  });

  const port = await getPort();
  registerRoutes(app);
  app.listen(port, () => {
    console.log(`app app listening on port ${port}`);
  });
};

function registerRoutes(app: Application.Application) {
  app.use("/", bookingRouter);
  app.use("/", widgetRouter);
}

expressApp().catch((err) => {
  console.log("error from express", err);
  process.exit(1);
});
