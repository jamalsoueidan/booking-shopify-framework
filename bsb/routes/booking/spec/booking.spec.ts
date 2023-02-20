import { faker } from "@faker-js/faker";
import { StaffRole } from "@jamalsoueidan/bsb.types.staff";
import {
  createAppExpress,
  createShopifyExpress,
} from "@jamalsoueidan/bsd.testing-library.express";
import {
  createStaff,
  createStaffWithBooking,
} from "@jamalsoueidan/bsd.testing-library.mongodb";
import { endOfDay, startOfDay } from "date-fns";
import { BookingRouteGetAll } from "../booking";

require("@jamalsoueidan/bsd.testing-library.mongodb/mongodb.jest");

const productId = parseInt(faker.random.numeric(10), 10);

describe("booking routes test (embedded-app)", () => {
  it("Should be able to get all bookings", async () => {
    const request = createShopifyExpress(BookingRouteGetAll());

    await createStaffWithBooking({ group: "a", productId });
    await createStaffWithBooking({ group: "a", productId });
    await createStaffWithBooking({ group: "b", productId });

    const res = await request
      .get(`/bookings?start=${new Date().toJSON()}&end=${new Date().toJSON()}`)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.length).toEqual(3);
  });

  it("Should throw error when end param is missing", async () => {
    const request = createShopifyExpress(BookingRouteGetAll());

    const res = await request
      .get(`/bookings?start=${new Date().toJSON()}`)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBeFalsy();
  });

  it("Should throw error when start param is missing", async () => {
    const request = createShopifyExpress(BookingRouteGetAll());

    const res = await request
      .get(`/bookings?end=${new Date().toJSON()}`)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBeFalsy();
  });
});

describe("booking routes test (external-app)", () => {
  it("Should be able to get only bookings in the same group by range", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.user,
    });

    await createStaffWithBooking({ group: "a", productId });
    await createStaffWithBooking({ group: "a", productId });
    await createStaffWithBooking({ group: "b", productId });

    const request = createAppExpress(BookingRouteGetAll(), loggedInStaff);
    const res = await request
      .get(
        `/bookings?start=${startOfDay(new Date()).toJSON()}&end=${endOfDay(
          new Date(),
        ).toJSON()}`,
      )
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.length).toEqual(2);
  });

  it("Should be able to get all bookings when user.role is admin ", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.owner,
    });

    await createStaffWithBooking({ group: "b", productId });
    await createStaffWithBooking({ group: "c", productId });
    await createStaffWithBooking({ group: "d", productId });

    const request = createAppExpress(BookingRouteGetAll(), loggedInStaff);
    const res = await request
      .get(
        `/bookings?start=${startOfDay(new Date()).toJSON()}&end=${endOfDay(
          new Date(),
        ).toJSON()}`,
      )
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.length).toEqual(3);
  });
});
