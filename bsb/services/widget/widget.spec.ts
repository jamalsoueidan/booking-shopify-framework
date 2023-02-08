import { faker } from "@faker-js/faker";
import { BookingModel } from "@jamalsoueidan/bsb.services.booking";
import { CartModel } from "@jamalsoueidan/bsb.services.cart";
import { ProductServiceUpdate } from "@jamalsoueidan/bsb.services.product";
import { StaffServiceFindByIdAndUpdate } from "@jamalsoueidan/bsb.services.staff";
import {
  createProduct,
  createStaffAndUpdateProduct,
  createStaffWithSchedule,
  shop,
} from "@jamalsoueidan/bsd.testing-library.mongodb";
import { addDays, format } from "date-fns";
import { WidgetServiceAvailability, WidgetServiceGetStaff } from "./widget";

require("@jamalsoueidan/bsd.testing-library.mongodb/mongodb.jest");

describe("widget service test", () => {
  it("Should find a staff after adding staff to the product", async () => {
    const productId = parseInt(faker.random.numeric(10), 10);
    const tag = faker.random.word();
    const product = await createProduct({ productId });

    await createStaffAndUpdateProduct({
      product,
      tag,
    });
    const query = {
      productId,
      shop,
    };

    const allStaff = await WidgetServiceGetStaff(query);
    expect(allStaff.length).toEqual(1);
  });

  it("Should not include inactive staff.", async () => {
    const productId = parseInt(faker.random.numeric(10), 10);
    const tag = faker.random.word();

    const product = await createProduct({ productId });
    const { staff } = await createStaffAndUpdateProduct({ product, tag });

    await StaffServiceFindByIdAndUpdate(staff._id, {
      active: false,
    });

    const query = {
      productId,
      shop,
    };

    const allStaff = await WidgetServiceGetStaff(query);
    expect(allStaff.length).toEqual(0);
  });

  it("Should return staff hours on a specified day", async () => {
    const productId = parseInt(faker.random.numeric(10), 10);
    const tag = faker.random.word();

    const product = await createProduct({ productId });
    const { staff } = await createStaffAndUpdateProduct({ product, tag });

    // prepare a product
    const query = {
      end: format(addDays(new Date(), 1), "yyyy-MM-dd"),
      productId: product.productId,
      shop,
      staffId: staff._id,
      start: format(new Date(), "yyyy-MM-dd"),
    };

    const availability = await WidgetServiceAvailability(query);
    expect(availability.length).toEqual(1);
  });

  it("Should not return hours that are booked already", async () => {
    const productId = parseInt(faker.random.numeric(10), 10);
    const tag = faker.random.word();

    const product = await createProduct({ productId });
    const { staff } = await createStaffAndUpdateProduct({ product, tag });

    // prepare a product
    const query = {
      end: format(addDays(new Date(), 1), "yyyy-MM-dd"),
      productId: product.productId,
      shop,
      staffId: staff._id,
      start: format(new Date(), "yyyy-MM-dd"),
    };

    let availability = await WidgetServiceAvailability(query);
    const schedule = availability[0]?.hours[3];

    await BookingModel.create({
      customerId: 12345,
      end: schedule?.end,
      fulfillmentStatus: "refunded",
      lineItemId: 1100,
      lineItemTotal: 1,
      orderId: 1000,
      productId,
      shop,
      staff: schedule?.staff._id,
      start: schedule?.start,
      timeZone: "Europe/Paris",
      title: "anything",
    });

    availability = await WidgetServiceAvailability(query);
    const hours = availability[0]?.hours.filter((h) => h.start === schedule?.start && h.end === schedule?.end);
    expect(hours?.length).toEqual(0);
  });

  it("Should not return hours that are in cart", async () => {
    const productId = parseInt(faker.random.numeric(10), 10);
    const tag = faker.random.word();

    const product = await createProduct({ productId });
    const { staff } = await createStaffAndUpdateProduct({ product, tag });

    // prepare a product
    const query = {
      end: format(addDays(new Date(), 1), "yyyy-MM-dd"),
      productId: product.productId,
      shop,
      staffId: staff._id,
      start: format(new Date(), "yyyy-MM-dd"),
    };

    let availability = await WidgetServiceAvailability(query);
    const schedule = availability[0].hours[3];

    await CartModel.create({
      cartId: "asd",
      end: schedule?.end,
      shop,
      staff: schedule?.staff._id,
      start: schedule?.start,
    });

    availability = await WidgetServiceAvailability(query);
    const hours = availability[0]?.hours.filter((h) => h.start === schedule?.start && h.end === schedule?.end);
    expect(hours?.length).toEqual(0);
  });

  it("Should return hours for all staff on product", async () => {
    const productId = parseInt(faker.random.numeric(10), 10);
    const tag = faker.random.word();

    const product = await createProduct({ productId });

    const { staff: staff1 } = await createStaffWithSchedule({ tag });
    const { staff: staff2 } = await createStaffWithSchedule({ tag });

    await ProductServiceUpdate(
      {
        id: product._id,
        shop,
      },
      {
        staff: [
          { _id: staff1._id, tag },
          { _id: staff2._id, tag },
        ],
      },
    );

    const query = {
      end: format(addDays(new Date(), 1), "yyyy-MM-dd"),
      productId: product.productId,
      shop,
      start: format(new Date(), "yyyy-MM-dd"),
    };

    const availability = await WidgetServiceAvailability(query);
    const fullNames: string[] = [];
    availability.forEach((avail) => avail.hours.forEach((h) => fullNames.push(h.staff.fullname)));
    const fullnamesUnique = [...new Set(fullNames)];
    expect(fullnamesUnique.length).toEqual(2);
  });
});
