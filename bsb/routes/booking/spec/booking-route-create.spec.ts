import { faker } from "@faker-js/faker";
import { StaffRole } from "@jamalsoueidan/bsb.types.staff";
import {
  createAppExpress,
  createShopifyExpress,
} from "@jamalsoueidan/bsd.testing-library.express";
import {
  createCustomer,
  createProduct,
  createStaff,
} from "@jamalsoueidan/bsd.testing-library.mongodb";
import { addHours } from "date-fns";
import { bookingRouteCreate } from "../booking.routes";

require("@jamalsoueidan/bsd.testing-library.mongodb/mongodb.jest");

const productId = faker.random.numeric(10);

describe("Shopify: booking create route test", () => {
  it("Should be able to create booking", async () => {
    const randomStaff = await createStaff({
      group: "a",
      role: StaffRole.user,
    });

    const customer = await createCustomer();

    await createProduct({ productId });

    const request = createShopifyExpress(bookingRouteCreate);
    const res = await request.post(`/bookings`).send({
      customerId: customer.customerId,
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
    const request = createShopifyExpress(bookingRouteCreate);

    const res = await request.post(`/bookings`).send({
      end: addHours(new Date(), 1),
      productId,
      start: new Date(),
    });

    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBeFalsy();
    expect(res.body.error.customerId).toBeTruthy();
  });
});

describe("Application: booking create route test", () => {
  it("User: Should not be able to create booking for another user", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.user,
    });
    const newUser = await createStaff({
      group: "a",
      role: StaffRole.user,
    });
    const customer = await createCustomer();
    await createProduct({ productId });

    const request = createAppExpress(bookingRouteCreate, loggedInStaff);
    const res = await request.post(`/bookings`).send({
      customerId: customer.customerId,
      end: addHours(new Date(), 1),
      productId,
      staff: newUser._id,
      start: new Date(),
    });

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBeDefined();
    expect(res.body.success).toBeFalsy();
  });
  it("User: Should be able to create booking", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.user,
    });

    const customer = await createCustomer();
    await createProduct({ productId });

    const request = createAppExpress(bookingRouteCreate, loggedInStaff);
    const res = await request.post(`/bookings`).send({
      customerId: customer.customerId,
      end: addHours(new Date(), 1),
      productId,
      staff: loggedInStaff._id,
      start: new Date(),
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.payload._id).toBeDefined();
    expect(res.body.success).toBeTruthy();
  });

  it("Admin: Should not be able to create booking for another user in another gorup", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.admin,
    });
    const newUser = await createStaff({
      group: "b",
      role: StaffRole.user,
    });
    const customer = await createCustomer();
    await createProduct({ productId });

    const request = createAppExpress(bookingRouteCreate, loggedInStaff);
    const res = await request.post(`/bookings`).send({
      customerId: customer.customerId,
      end: addHours(new Date(), 1),
      productId,
      staff: newUser._id,
      start: new Date(),
    });

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBeDefined();
    expect(res.body.success).toBeFalsy();
  });
  it("Admin: Should be able to create booking for users in the same group", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.admin,
    });

    const newUser = await createStaff({
      group: "a",
      role: StaffRole.user,
    });
    const customer = await createCustomer();
    await createProduct({ productId });

    const request = createAppExpress(bookingRouteCreate, loggedInStaff);
    const res = await request.post(`/bookings`).send({
      customerId: customer.customerId,
      end: addHours(new Date(), 1),
      productId,
      staff: newUser.id,
      start: new Date(),
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.payload._id).toBeDefined();
    expect(res.body.success).toBeTruthy();
  });
});
