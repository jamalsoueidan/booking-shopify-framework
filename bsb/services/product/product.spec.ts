import { IStaffDocument } from "@jamalsoueidan/bsb.services.staff";
import { Tag } from "@jamalsoueidan/bsb.types.tag";
import {
  createProduct,
  createSchedule,
  createStaff,
  shop,
} from "@jamalsoueidan/bsd.testing-library.mongodb";
import { addDays, addHours } from "date-fns";
import {
  ProductServiceGetAvailableStaff,
  ProductServiceGetById,
  ProductServiceUpdate,
} from "./product";
import { IProductDocument } from "./product.schema";

require("@jamalsoueidan/bsd.testing-library.mongodb/mongodb.jest");

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
    const updateProduct = await ProductServiceUpdate(query, {
      buffertime,
      duration,
    });

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

    const staffToAdd = await ProductServiceGetAvailableStaff(shop);

    expect(staffToAdd.length).toEqual(3);

    const pickStaff = staffToAdd[0];
    const query = {
      id: product._id.toString(),
      shop,
    };

    let updatedProduct = await ProductServiceUpdate(query, {
      staff: [{ _id: pickStaff._id, tag: pickStaff.tags[0] }],
    });

    expect(updatedProduct?.staff.length).toEqual(1);

    updatedProduct = await ProductServiceUpdate(query, {
      staff: [],
    });

    expect(updatedProduct?.staff.length).toEqual(0);
  });
});
