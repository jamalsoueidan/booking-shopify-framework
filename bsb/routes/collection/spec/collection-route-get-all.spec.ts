import { faker } from "@faker-js/faker";
import { CollectionServerCreateBulk } from "@jamalsoueidan/bsb.services.collection";
import {
  ProductModel,
  ProductServiceUpdate,
} from "@jamalsoueidan/bsb.services.product";
import { CollectionServiceGetAllReturn } from "@jamalsoueidan/bsb.types.collection";
import { StaffRole } from "@jamalsoueidan/bsb.types.staff";
import { Tag } from "@jamalsoueidan/bsb.types.tag";
import {
  createAppExpress,
  createShopifyExpress,
} from "@jamalsoueidan/bsd.testing-library.express";
import {
  createStaff,
  createStaffWithSchedule,
  shop,
} from "@jamalsoueidan/bsd.testing-library.mongodb";
import { collectionRouteGetAll } from "../collection.routes";
import { collectionsMock } from "./collection.mock";

require("@jamalsoueidan/bsd.testing-library.mongodb/mongodb.jest");

const productId = parseInt(faker.random.numeric(10), 10);
const tag = Tag.all_day;

describe("Shopify: collection get all route test", () => {
  it("Should be able to get all collections", async () => {
    await CollectionServerCreateBulk({
      collections: collectionsMock,
      shop,
    });

    const product = await ProductModel.findOne().lean();

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

    const request = createShopifyExpress(collectionRouteGetAll);
    const res = await request
      .get(`/collections`)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.payload.length).toBe(2);
    const collection: CollectionServiceGetAllReturn = res.body.payload.find(
      (c: CollectionServiceGetAllReturn) =>
        c.collectionId === product?.collectionId,
    );
    const collectionProduct = collection.products.find(
      (p) => p._id === product?._id.toString(),
    );
    expect(collectionProduct?.staff.length).toBe(2);
  });
});

describe("Application: collection get all route test", () => {
  it("Should be able to get only collections with staff in the same group", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.user,
    });

    await CollectionServerCreateBulk({ collections: collectionsMock, shop });

    const product = await ProductModel.findOne();

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

    const request = createAppExpress(collectionRouteGetAll, loggedInStaff);
    const res = await request
      .get(`/collections`)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.length).toBe(1);

    const collection: CollectionServiceGetAllReturn = res.body.payload.find(
      (c: CollectionServiceGetAllReturn) =>
        c.collectionId === product?.collectionId,
    );
    const collectionProduct = collection.products.find(
      (p) => p._id === product?._id.toString(),
    );
    expect(collectionProduct?.staff.length).toBe(1);
  });
});
