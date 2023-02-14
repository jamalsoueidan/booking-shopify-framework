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
import { addDays, addHours, isWithinInterval, setHours } from "date-fns";
import { WidgetServiceAvailability, WidgetServiceGetStaff } from "./widget";

require("@jamalsoueidan/bsd.testing-library.mongodb/mongodb.jest");

const productId = parseInt(faker.random.numeric(10), 10);
const tag = faker.random.word();

describe("widget service test", () => {
  it("Should return 1 staff after adding 1 staff to product", async () => {
    const product = await createProduct({ productId });

    await createStaffWithScheduleAndUpdateProduct({
      product,
      tag,
    });

    const allStaff = await WidgetServiceGetStaff({
      productId,
      shop,
    });

    expect(allStaff.length).toEqual(1);
  });

  it("should return 2 staff after adding 2 staff to product", async () => {
    const { staff: staff1 } = await createStaffWithSchedule({ tag });
    const { staff: staff2 } = await createStaffWithSchedule({ tag });

    const product = await createProduct({ productId });
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

    const allStaff = await WidgetServiceGetStaff({
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

  it("Should return hours for specific staff for 1 day", async () => {
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

  it("Should return hours for specific staff between 2 days", async () => {
    const product = await createProduct({ productId });
    const staff = await createStaff();

    let start = setHours(new Date(), 12);

    await createSchedule({
      end: addHours(start, 2),
      staff: staff._id,
      start,
      tag,
    });

    start = addDays(start, 1);
    await createSchedule({
      end: addHours(start, 2),
      staff: staff._id,
      start,
      tag,
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

  it("Should not return booked hours", async () => {
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
      (h) =>
        isWithinInterval(schedule?.start, h) ||
        isWithinInterval(schedule.end, h),
    );

    expect(hours?.length).toEqual(0);
  });

  it("Should not return hours in cart", async () => {
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
      (h) =>
        isWithinInterval(schedule?.start, h) ||
        isWithinInterval(schedule.end, h),
    );
    expect(hours?.length).toEqual(0);
  });

  it("Should not return hours in cart and booking", async () => {
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
    const schedule1 = faker.helpers.arrayElement(availability[0].hours);

    await CartModel.create({
      cartId: "asd",
      end: schedule1.end,
      shop,
      staff: schedule1.staff._id,
      start: schedule1.start,
    });

    availability = await WidgetServiceAvailability(query);
    const schedule2 = faker.helpers.arrayElement(availability[0].hours);

    await BookingModel.create({
      customerId: 12345,
      end: schedule2.end,
      fulfillmentStatus: "refunded",
      lineItemId: 1100,
      lineItemTotal: 1,
      orderId: 1000,
      productId,
      shop,
      staff: schedule2.staff._id,
      start: schedule2.start,
      timeZone: "Europe/Paris",
      title: "anything",
    });

    availability = await WidgetServiceAvailability(query);
    const hours = availability[0]?.hours.filter(
      (h) =>
        isWithinInterval(schedule1.start, h) ||
        isWithinInterval(schedule1.end, h) ||
        isWithinInterval(schedule2.end, h) ||
        isWithinInterval(schedule2.end, h),
    );
    expect(hours?.length).toEqual(0);
  });

  it("Should return hours for all staff in product", async () => {
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

  it("Should return hours for all staff in product without booked for one staff", async () => {
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

    let availability = await WidgetServiceAvailability(query);
    const schedule = faker.helpers.arrayElement(availability[0].hours);

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
      (h) =>
        (isWithinInterval(schedule.start, h) ||
          isWithinInterval(schedule.end, h)) &&
        schedule.staff._id.toString() === h.staff._id.toString(),
    );
    expect(hours?.length).toEqual(0);
  });
});
