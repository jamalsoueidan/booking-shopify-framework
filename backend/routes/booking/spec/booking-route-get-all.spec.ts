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
import { bookingRouteGetAll } from "../booking.routes";

require("@jamalsoueidan/bit-dev.testing-library.mongodb/mongodb.jest");

const productId = parseInt(faker.random.numeric(10), 10);

describe("Shopify: booking get all route test", () => {
  it("Owner: Should be able to get all bookings", async () => {
    const { booking } = await createStaffWithBooking({ group: "a", productId });
    await createStaffWithBooking({ group: "a", productId });
    await createStaffWithBooking({ group: "b", productId });

    const request = createShopifyExpress(bookingRouteGetAll);
    const res = await request
      .get(
        `/bookings?start=${booking.start.toJSON()}&end=${booking.end.toJSON()}`,
      )
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.length).toEqual(3);
  });

  it("Owner: Should throw error when end param is missing", async () => {
    const request = createShopifyExpress(bookingRouteGetAll);

    const res = await request
      .get(`/bookings?start=${new Date().toJSON()}`)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeFalsy();
  });

  it("Owner: Should throw error when start param is missing", async () => {
    const request = createShopifyExpress(bookingRouteGetAll);

    const res = await request
      .get(`/bookings?end=${new Date().toJSON()}`)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeFalsy();
  });
});

describe("Application: booking get all route test", () => {
  it("Should be able to get only bookings in the same group by range", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.user,
    });

    const { booking } = await createStaffWithBooking({ group: "a", productId });
    await createStaffWithBooking({ group: "a", productId });
    await createStaffWithBooking({ group: "b", productId });

    const request = createAppExpress(bookingRouteGetAll, loggedInStaff);
    const res = await request
      .get(
        `/bookings?start=${booking.start.toJSON()}&end=${booking.end.toJSON()}`,
      )
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.length).toEqual(2);
  });

  it("Should be able to get all bookings when user.role is admin", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.owner,
    });

    const { booking } = await createStaffWithBooking({ group: "b", productId });
    await createStaffWithBooking({ group: "c", productId });
    await createStaffWithBooking({ group: "d", productId });

    const request = createAppExpress(bookingRouteGetAll, loggedInStaff);
    const res = await request
      .get(
        `/bookings?start=${booking.start.toJSON()}&end=${booking.end.toJSON()}`,
      )
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.length).toEqual(3);
  });
});
