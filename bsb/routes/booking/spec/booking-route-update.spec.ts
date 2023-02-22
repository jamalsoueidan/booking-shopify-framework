import { faker } from "@faker-js/faker";
import { StaffRole } from "@jamalsoueidan/bsb.types.staff";
import {
  createAppExpress,
  createShopifyExpress,
} from "@jamalsoueidan/bsd.testing-library.express";
import {
  createBooking,
  createProduct,
  createStaff,
} from "@jamalsoueidan/bsd.testing-library.mongodb";
import { addHours } from "date-fns";
import { bookingRouteUpdate } from "../booking.routes";

require("@jamalsoueidan/bsd.testing-library.mongodb/mongodb.jest");

const productId = faker.random.numeric(10);

describe("Shopify: booking update route test", () => {
  it("Should be able to update booking", async () => {
    const randomStaff = await createStaff({
      group: "a",
      role: StaffRole.user,
    });

    const product = await createProduct({ productId });
    const booking = await createBooking({
      end: addHours(new Date(), 1),
      productId: product.productId,
      staff: randomStaff.id,
      start: new Date(),
    });

    const request = createShopifyExpress(bookingRouteUpdate);
    const res = await request.put(`/bookings/${booking._id}`).send({
      customerId: "1234567890",
      end: addHours(new Date(), 1),
      productId,
      staff: randomStaff._id,
      start: new Date(),
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.payload._id).toBeDefined();
    expect(res.body.success).toBeTruthy();
  });

  it("Should throw error when fields missing when creating booking", async () => {
    const request = createShopifyExpress(bookingRouteUpdate);

    const res = await request.put(`/bookings/63f3f086caaed6a0b582123b`).send({
      end: addHours(new Date(), 1),
      productId,
      start: new Date(),
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeFalsy();
    expect(res.body.error.customerId).toBeTruthy();
  });
});

describe("Application: booking update route test", () => {
  it("User: Should not be able to update booking for another user", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.user,
    });

    const randomStaff = await createStaff({
      group: "a",
      role: StaffRole.user,
    });

    const product = await createProduct({ productId });
    const booking = await createBooking({
      end: addHours(new Date(), 1),
      productId: product.productId,
      staff: randomStaff.id,
      start: new Date(),
    });

    const request = createAppExpress(bookingRouteUpdate, loggedInStaff);
    const res = await request.put(`/bookings/${booking._id}`).send({
      customerId: "1234567890",
      end: addHours(new Date(), 1),
      productId,
      staff: randomStaff._id,
      start: new Date(),
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeFalsy();
  });
  it("User: Should be able to update own booking", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.user,
    });

    const product = await createProduct({ productId });
    const booking = await createBooking({
      end: addHours(new Date(), 1),
      productId: product.productId,
      staff: loggedInStaff.id,
      start: new Date(),
    });

    const request = createAppExpress(bookingRouteUpdate, loggedInStaff);
    const res = await request.put(`/bookings/${booking.id}`).send({
      customerId: "1234567890",
      end: addHours(new Date(), 1),
      productId,
      staff: loggedInStaff._id,
      start: new Date(),
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.payload._id).toBeDefined();
    expect(res.body.success).toBeTruthy();
  });

  it("Admin: Should not be able to update booking for another user in another gorup", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.admin,
    });

    const randomStaff = await createStaff({
      group: "b",
      role: StaffRole.user,
    });

    const product = await createProduct({ productId });
    const booking = await createBooking({
      end: addHours(new Date(), 1),
      productId: product.productId,
      staff: randomStaff.id,
      start: new Date(),
    });

    const request = createAppExpress(bookingRouteUpdate, loggedInStaff);
    const res = await request.put(`/bookings/${booking._id}`).send({
      customerId: "1234567890",
      end: addHours(new Date(), 1),
      productId,
      staff: randomStaff._id,
      start: new Date(),
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeFalsy();
  });
  it("Admin: Should be able to update booking for any users in the same group", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.admin,
    });

    const randomStaff = await createStaff({
      group: "a",
      role: StaffRole.user,
    });

    const product = await createProduct({ productId });
    const booking = await createBooking({
      end: addHours(new Date(), 1),
      productId: product.productId,
      staff: randomStaff.id,
      start: new Date(),
    });

    const request = createAppExpress(bookingRouteUpdate, loggedInStaff);
    const res = await request.put(`/bookings/${booking._id}`).send({
      customerId: "1234567890",
      end: addHours(new Date(), 1),
      productId,
      staff: randomStaff._id,
      start: new Date(),
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.payload._id).toBeDefined();
    expect(res.body.success).toBeTruthy();
  });
});
