import { StaffRole } from "@jamalsoueidan/backend.types.staff";
import {
  createAppExpress,
  createShopifyExpress,
} from "@jamalsoueidan/bit-dev.testing-library.express";
import { createStaff } from "@jamalsoueidan/bit-dev.testing-library.mongodb";
import { staffRouteGetById } from "../staff.routes";

require("@jamalsoueidan/bit-dev.testing-library.mongodb/mongodb.jest");

describe("Shopify: staff get by id route test", () => {
  it("Owner: Should be able to get staff by id in all groups", async () => {
    const staff = await createStaff({
      group: "b",
    });

    const request = createShopifyExpress(staffRouteGetById);
    const res = await request
      .get(`/staff/${staff._id}`)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.fullname).toEqual(staff.fullname);
  });
});

describe("Application: staff get id route test", () => {
  it("User: Should be able to get staff by id in the same group", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.user,
    });

    const otherStaff = await createStaff({
      group: "a",
    });

    const request = createAppExpress(staffRouteGetById, loggedInStaff);
    const res = await request.get(`/staff/${otherStaff._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.fullname).toEqual(otherStaff.fullname);
  });

  it("User: Should NOT be able to get by id in the other group", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.user,
    });

    const otherStaff = await createStaff({
      group: "b",
    });

    const request = createAppExpress(staffRouteGetById, loggedInStaff);
    const res = await request.get(`/staff/${otherStaff._id}`);
    expect(res.statusCode).toBe(400);
  });

  it("Admin: Should be able to get staff by id in the same group", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.admin,
    });

    const otherStaff = await createStaff({
      group: "a",
    });

    const request = createAppExpress(staffRouteGetById, loggedInStaff);
    const res = await request.get(`/staff/${otherStaff._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.fullname).toEqual(otherStaff.fullname);
  });
});
