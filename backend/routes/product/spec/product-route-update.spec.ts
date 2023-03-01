import {
  ProductServiceGetById,
  ProductServiceUpdate,
} from "@jamalsoueidan/backend.services.product";
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
import { productRouteUpdate } from "../product.routes";

require("@jamalsoueidan/bit-dev.testing-library.mongodb/mongodb.jest");

const productId = 123456789;
const tag = Tag.all_day;

describe("Shopify: product update route test", () => {
  it("Owner: Should be able to update product", async () => {
    const product = await createProduct({ productId });

    const { staff: staff1 } = await createStaffWithSchedule({
      group: "a",
      tag,
    });

    const { staff: staff2 } = await createStaffWithSchedule({
      group: "b",
      tag,
    });

    const request = createShopifyExpress(productRouteUpdate);
    const res = await request
      .put(`/products/${product._id}`)
      .send({
        staff: [
          { _id: staff1._id, tag },
          { _id: staff2._id, tag },
        ],
      })
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.payload.modifiedCount).toBe(1);
  });

  it("Owner: Should throw error when tag is invalid or staff id is invalid", async () => {
    const product = await createProduct({ productId });

    const { staff: staff1 } = await createStaffWithSchedule({
      group: "a",
      tag,
    });

    const request = createShopifyExpress(productRouteUpdate);
    const res = await request
      .put(`/products/${product._id}`)
      .send({
        staff: [{ _id: staff1._id, tag: "asd" }],
      })
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
  });
});

describe("Application: product get all route test", () => {
  it("User: Should NOT be able to update product", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.user,
    });

    const product = await createProduct({ productId });

    const request = createAppExpress(productRouteUpdate, loggedInStaff);
    const res = await request
      .put(`/products/${product._id}`)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeFalsy();
  });

  it("Admin: Should be able to update product", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.admin,
    });

    let product = await createProduct({ productId });

    const { staff: staff1 } = await createStaffWithSchedule({
      group: "a",
      tag,
    });

    const { staff: staff2 } = await createStaffWithSchedule({
      group: "a",
      tag,
    });

    const { staff: staff3 } = await createStaffWithSchedule({
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
          { _id: staff1._id, tag },
          { _id: staff3._id, tag },
        ],
      },
    );

    const request = createAppExpress(productRouteUpdate, loggedInStaff);
    const res = await request
      .put(`/products/${product._id}`)
      .send({
        staff: [
          { _id: staff1._id, tag },
          { _id: staff2._id, tag },
        ],
      })
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.payload.modifiedCount).toBe(1);

    // make sure that the staff is not overwriten and the rest of the staff group still exists
    product = await ProductServiceGetById({ id: product._id, shop });
    expect(product.staff.length).toBe(3);
  });
});
