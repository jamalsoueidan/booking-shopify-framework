import { IStaffDocument } from "@jamalsoueidan/backend.services.staff";
import { Tag } from "@jamalsoueidan/backend.types.tag";
import {
  createProduct,
  createSchedule,
  createStaff,
  shop,
} from "@jamalsoueidan/bit-dev.testing-library.mongodb";
import { addDays, addHours } from "date-fns";
import {
  ProductServiceGetAvailableStaff,
  ProductServiceGetById,
  ProductServiceUpdate,
} from "./product";
import { IProductDocument } from "./product.schema";

require("@jamalsoueidan/bit-dev.testing-library.mongodb/mongodb.jest");

const productId = 123456789;

interface ICustomProductModel extends IProductDocument {}
interface ICustomStaffModel extends IStaffDocument {}

let product: ICustomProductModel;
let staff1: ICustomStaffModel;
let staff2: ICustomStaffModel;
let staff3: ICustomStaffModel;

const tag = Tag.end_of_week;

describe("product testing", () => {
  it("Should find by id", async () => {
    product = await createProduct({ productId });

    const query = {
      id: product._id,
      shop,
    };

    const findProduct = await ProductServiceGetById(query);

    expect(findProduct.productId).toEqual(productId);
  });

  it("Should update properties by id", async () => {
    product = await createProduct({ productId });

    const query = {
      id: product._id,
      shop,
    };

    const duration = 50;
    const buffertime = 100;
    const updated = await ProductServiceUpdate(query, {
      buffertime,
      duration,
    });

    expect(updated.modifiedCount).toEqual(1);
    const updateProduct = await ProductServiceGetById(query);

    expect(updateProduct?.duration).toEqual(duration);
    expect(updateProduct?.buffertime).toEqual(buffertime);
  });

  it("Should be able to add staff, and remove staff", async () => {
    product = await createProduct({ productId });

    staff1 = await createStaff();

    const start = addDays(new Date(), 1);

    await createSchedule({
      end: addHours(start, 5),
      staff: staff1._id,
      start,
      tag,
    });

    staff2 = await createStaff();

    await createSchedule({
      end: addHours(start, 2),
      staff: staff2._id,
      start,
      tag,
    });

    staff3 = await createStaff();

    await createSchedule({
      end: addHours(start, 10),
      staff: staff3._id,
      start,
      tag,
    });

    const staffToAdd = await ProductServiceGetAvailableStaff({ shop });

    expect(staffToAdd.length).toEqual(3);

    const pickStaff = staffToAdd[0];
    const query = {
      id: product._id.toString(),
      shop,
    };

    let updated = await ProductServiceUpdate(query, {
      staff: [{ _id: pickStaff._id, tag: pickStaff.tags[0] }],
    });
    expect(updated.modifiedCount).toEqual(1);

    let updatedProduct = await ProductServiceGetById(query);
    expect(updatedProduct?.staff.length).toEqual(1);

    updated = await ProductServiceUpdate(query, {
      staff: [],
    });

    updatedProduct = await ProductServiceGetById(query);
    expect(updatedProduct?.staff.length).toEqual(0);
  });
});
