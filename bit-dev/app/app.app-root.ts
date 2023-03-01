/* eslint-disable no-console */
import { ShopifySessionModel } from "@jamalsoueidan/backend.services.shopify-session";
import {
  connect,
  createBooking,
  createProduct,
  createStaffWithScheduleAndUpdateProduct,
  shop,
} from "@jamalsoueidan/bit-dev.testing-library.mongodb";
import Application from "express";

import { bookingRouter } from "@jamalsoueidan/backend.routes.booking";
import { widgetRouter } from "@jamalsoueidan/backend.routes.widget";

import { Tag } from "@jamalsoueidan/backend.types.tag";
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

  const booking = await createBooking({ productId, staff: staff._id });

  console.log(`http://localhost:3000/products/${product._id.toString()}`);
  console.log(
    `http://localhost:3000/bookings?start=${booking.start.toJSON()}&end=${booking.end.toJSON()}`,
  );

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
