import { faker } from "@faker-js/faker";
import { StaffRole } from "@jamalsoueidan/backend.types.staff";
import {
  createAppExpress,
  createShopifyExpress,
} from "@jamalsoueidan/bit-dev.testing-library.express";
import {
  createStaff,
  createStaffWithBooking,
} from "@jamalsoueidan/bit-dev.testing-library.mongodb";
import { bookingRouteGetById } from "../booking.routes";

require("@jamalsoueidan/bit-dev.testing-library.mongodb/mongodb.jest");

const productId = parseInt(faker.random.numeric(10), 10);

describe("Shopify: booking get by id route test", () => {
  it("Owner: Should be able to get any booking by id", async () => {
    const { booking } = await createStaffWithBooking({ group: "a", productId });

    const request = createShopifyExpress(bookingRouteGetById);
    const res = await request
      .get(`/bookings/${booking.id}`)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload._id).toEqual(booking.id);
  });
});

describe("Application: booking get by id route test", () => {
  it("User: Should not be able to get booking by id in another group", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.user,
    });

    const { booking } = await createStaffWithBooking({ group: "b", productId });

    const request = createAppExpress(bookingRouteGetById, loggedInStaff);

    const res = await request
      .get(`/bookings/${booking.id}`)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeFalsy();
  });

  it("Admin: Should not be able to get booking by id in another group", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.admin,
    });

    const { booking } = await createStaffWithBooking({ group: "b", productId });

    const request = createAppExpress(bookingRouteGetById, loggedInStaff);

    const res = await request
      .get(`/bookings/${booking.id}`)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeFalsy();
  });

  it("User: Should be able to get booking by id in the same group", async () => {
    const group = "a";
    const loggedInStaff = await createStaff({
      group,
      role: StaffRole.user,
    });

    const { booking } = await createStaffWithBooking({ group, productId });

    const request = createAppExpress(bookingRouteGetById, loggedInStaff);

    const res = await request
      .get(`/bookings/${booking.id}`)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload._id).toEqual(booking.id);
  });

  it("Admin: Should be able to get booking by id in the same group", async () => {
    const group = "a";
    const loggedInStaff = await createStaff({
      group,
      role: StaffRole.admin,
    });

    const { booking } = await createStaffWithBooking({ group, productId });

    const request = createAppExpress(bookingRouteGetById, loggedInStaff);
    const res = await request
      .get(`/bookings/${booking.id}`)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload._id).toEqual(booking.id);
  });
});
