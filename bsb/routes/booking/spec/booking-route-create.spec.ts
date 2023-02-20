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
import { bookingRouteCreate } from "../booking";

require("@jamalsoueidan/bsd.testing-library.mongodb/mongodb.jest");

const productId = faker.random.numeric(10);

describe("booking create route test (embedded-app)", () => {
  it("Should be able to create booking", async () => {
    const request = createShopifyExpress(bookingRouteCreate);
    const randomStaff = await createStaff({
      group: "a",
      role: StaffRole.user,
    });

    const customer = await createCustomer();

    await createProduct({ productId });

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

describe("booking create route test (external-app)", () => {
  it("Should not be able to create booking for another user", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.user,
    });

    const request = createAppExpress(bookingRouteCreate, loggedInStaff);

    const newUser = await createStaff({
      group: "a",
      role: StaffRole.user,
    });

    const customer = await createCustomer();

    await createProduct({ productId });

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
  it("Should be able to create booking", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.user,
    });

    const request = createAppExpress(bookingRouteCreate, loggedInStaff);

    const customer = await createCustomer();

    await createProduct({ productId });

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
});
