import { faker } from "@faker-js/faker";
import { BookingModel } from "@jamalsoueidan/bsb.services.booking";
import { CartModel } from "@jamalsoueidan/bsb.services.cart";
import { ProductServiceUpdate } from "@jamalsoueidan/bsb.services.product";
import { StaffServiceFindByIdAndUpdate } from "@jamalsoueidan/bsb.services.staff";
import {
  createProduct,
  createSchedule,
  createStaff,
  createStaffWithSchedule,
  createStaffWithScheduleAndUpdateProduct,
  shop,
} from "@jamalsoueidan/bsd.testing-library.mongodb";
import { addDays, addHours } from "date-fns";
import { WidgetServiceAvailability, WidgetServiceGetStaff } from "./widget";

require("@jamalsoueidan/bsd.testing-library.mongodb/mongodb.jest");

const productId = parseInt(faker.random.numeric(10), 10);
const tag = faker.random.word();

describe("widget service test", () => {
  it("Should find a staff after adding staff to the product", async () => {
    const product = await createProduct({ productId });

    await createStaffWithScheduleAndUpdateProduct({
      product,
      tag,
    });

    let allStaff = await WidgetServiceGetStaff({
      productId,
      shop,
    });

    expect(allStaff.length).toEqual(1);
  });

  it("should find all staff after adding 2 staff to the product", async () => {
    const { staff: staff1 } = await createStaffWithSchedule({ tag });
    const { staff: staff2 } = await createStaffWithSchedule({ tag });

    const product = await createProduct({ productId });
    const updatedProduct = await ProductServiceUpdate(
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

    let allStaff = await WidgetServiceGetStaff({
      productId,
      shop,
    });

    expect(allStaff.length).toEqual(2);
  });

  it("Should not include inactive staff.", async () => {
    const product = await createProduct({ productId });
    const { staff } = await createStaffWithScheduleAndUpdateProduct({
      product,
      tag,
    });

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

  it("Should return hours for staff for 1 day", async () => {
    const product = await createProduct({ productId });
    const { staff } = await createStaffWithScheduleAndUpdateProduct({
      product,
      tag,
    });

    const query = {
      end: addDays(new Date(), 1),
      productId: product.productId,
      shop,
      staffId: staff._id,
      start: new Date(),
    };

    const availability = await WidgetServiceAvailability(query);
    expect(availability.length).toEqual(1);
  });

  it("Should return hours for staff between 2 days", async () => {
    const product = await createProduct({ productId });
    const staff = await createStaff();

    await createSchedule({
      staff: staff._id,
      tag,
      start: new Date(),
      end: addHours(new Date(), 2),
    });

    const start = addDays(new Date(), 1);
    await createSchedule({
      staff: staff._id,
      tag,
      start,
      end: addHours(start, 2),
    });

    await ProductServiceUpdate(
      {
        id: product._id,
        shop,
      },
      {
        staff: [{ _id: staff._id, tag }],
      },
    );

    const query = {
      end: addDays(new Date(), 2),
      productId: product.productId,
      shop,
      staffId: staff._id,
      start: new Date(),
    };

    const availability = await WidgetServiceAvailability(query);
    expect(availability.length).toEqual(2);
  });

  it("Should not return hours that are booked already", async () => {
    const product = await createProduct({ productId });
    const { staff } = await createStaffWithScheduleAndUpdateProduct({
      product,
      tag,
    });

    const query = {
      end: addDays(new Date(), 1),
      productId: product.productId,
      shop,
      staffId: staff._id,
      start: new Date(),
    };

    let availability = await WidgetServiceAvailability(query);
    const schedule = availability[0]?.hours[3];

    await BookingModel.create({
      customerId: 12345,
      end: schedule.end,
      fulfillmentStatus: "refunded",
      lineItemId: 1100,
      lineItemTotal: 1,
      orderId: 1000,
      productId,
      shop,
      staff: schedule.staff._id,
      start: schedule.start,
      timeZone: "Europe/Paris",
      title: "anything",
    });

    availability = await WidgetServiceAvailability(query);
    const hours = availability[0]?.hours.filter(
      (h) => h.start === schedule?.start && h.end === schedule?.end,
    );
    expect(hours?.length).toEqual(0);
  });

  it("Should not return hours that are in cart", async () => {
    const productId = parseInt(faker.random.numeric(10), 10);
    const tag = faker.random.word();

    const product = await createProduct({ productId });
    const { staff } = await createStaffWithScheduleAndUpdateProduct({
      product,
      tag,
    });

    // prepare a product
    const query = {
      end: addDays(new Date(), 1),
      productId: product.productId,
      shop,
      staffId: staff._id,
      start: new Date(),
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
    const hours = availability[0]?.hours.filter(
      (h) => h.start === schedule?.start && h.end === schedule?.end,
    );
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
      end: addDays(new Date(), 1),
      productId: product.productId,
      shop,
      start: new Date(),
    };

    const availability = await WidgetServiceAvailability(query);
    const fullNames: string[] = [];
    availability.forEach((avail) =>
      avail.hours.forEach((h) => fullNames.push(h.staff.fullname)),
    );
    const fullnamesUnique = [...new Set(fullNames)];
    expect(fullnamesUnique.length).toEqual(2);
  });
});
