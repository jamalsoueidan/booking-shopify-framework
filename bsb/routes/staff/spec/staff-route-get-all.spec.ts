import { StaffRole } from "@jamalsoueidan/bsb.types.staff";
import {
  createAppExpress,
  createShopifyExpress,
} from "@jamalsoueidan/bsd.testing-library.express";
import { createStaff } from "@jamalsoueidan/bsd.testing-library.mongodb";
import { staffRouteGetAll } from "../staff.routes";

require("@jamalsoueidan/bsd.testing-library.mongodb/mongodb.jest");

describe("Shopify: staff get all route test", () => {
  it("Owner: Should be able to get all staff in all groups", async () => {
    await createStaff({
      group: "a",
    });
    await createStaff({
      group: "b",
    });

    const request = createShopifyExpress(staffRouteGetAll);
    const res = await request.get(`/staff`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.length).toEqual(2);
  });
});

describe("Application: staff get all route test", () => {
  it("User: Should be able to get all staff in the same group", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.user,
    });

    await createStaff({
      group: "a",
    });
    await createStaff({
      group: "b",
    });

    const request = createAppExpress(staffRouteGetAll, loggedInStaff);
    const res = await request.get(`/staff`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.length).toEqual(2);
  });

  it("Admin: Should be able to get all staff in the same group", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.admin,
    });

    await createStaff({
      group: "a",
    });

    await createStaff({
      group: "b",
    });

    const request = createAppExpress(staffRouteGetAll, loggedInStaff);
    const res = await request.get(`/staff`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.length).toEqual(2);
  });
});
