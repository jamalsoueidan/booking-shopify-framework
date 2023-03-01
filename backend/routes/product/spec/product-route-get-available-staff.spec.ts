import { ProductServiceUpdate } from "@jamalsoueidan/backend.services.product";
import { StaffRole } from "@jamalsoueidan/backend.types.staff";
import { Tag } from "@jamalsoueidan/backend.types.tag";
import {
  createAppExpress,
  createShopifyExpress,
} from "@jamalsoueidan/bit-dev.testing-library.express";
import {
  createProduct,
  createStaff,
  createStaffWithSchedule,
  shop,
} from "@jamalsoueidan/bit-dev.testing-library.mongodb";
import { productRouteGetAvailableStaff } from "../product.routes";

require("@jamalsoueidan/bit-dev.testing-library.mongodb/mongodb.jest");

const productId = 123456789;
const tag = Tag.all_day;

describe("Shopify: product get available staff route test", () => {
  it("Should be able to get all available staff for product", async () => {
    await createProduct({ productId: 234243423 });
    const product = await createProduct({ productId });

    const { staff } = await createStaffWithSchedule({
      group: "a",
      tag,
    });

    const { staff: staff2 } = await createStaffWithSchedule({
      group: "b",
      tag,
    });

    await ProductServiceUpdate(
      {
        id: product?._id,
        shop,
      },
      {
        staff: [
          { _id: staff._id, tag },
          { _id: staff2._id, tag: Tag.end_of_week },
        ],
      },
    );

    const request = createShopifyExpress(productRouteGetAvailableStaff);
    const res = await request
      .get(`/products/staff/get-available`)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.payload.length).toBe(2);
  });
});

describe("Application: product get all route test", () => {
  it("User: Should NOT be able to get product available staff", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.user,
    });

    const request = createAppExpress(
      productRouteGetAvailableStaff,
      loggedInStaff,
    );
    const res = await request
      .get(`/products/staff/get-available`)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeFalsy();
  });

  it("Admin: Should be able to get all product that belongs to all staff", async () => {
    const tag = Tag.end_of_week;
    const { staff: loggedInStaff } = await createStaffWithSchedule({
      group: "a",
      role: StaffRole.admin,
      tag,
    });

    const product1 = await createProduct({ productId: 234243423 });
    const product2 = await createProduct({ productId: 893232 });

    const { staff } = await createStaffWithSchedule({
      group: "b",
      tag,
    });

    await ProductServiceUpdate(
      {
        id: product1?._id,
        shop,
      },
      {
        staff: [
          { _id: staff._id, tag },
          { _id: loggedInStaff._id, tag },
        ],
      },
    );

    await ProductServiceUpdate(
      {
        id: product2?._id,
        shop,
      },
      {
        staff: [{ _id: staff._id, tag }],
      },
    );

    const request = createAppExpress(
      productRouteGetAvailableStaff,
      loggedInStaff,
    );
    const res = await request
      .get(`/products/staff/get-available`)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.payload.length).toBe(1);
  });
});
