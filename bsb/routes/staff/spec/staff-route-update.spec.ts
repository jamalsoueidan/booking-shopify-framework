import { StaffRole } from "@jamalsoueidan/bsb.types.staff";
import {
  createAppExpress,
  createShopifyExpress,
} from "@jamalsoueidan/bsd.testing-library.express";
import { createStaff } from "@jamalsoueidan/bsd.testing-library.mongodb";
import { staffRouteUpdate } from "../staff.routes";

require("@jamalsoueidan/bsd.testing-library.mongodb/mongodb.jest");

describe("Shopify: staff update route test", () => {
  it("Owner: Should be able to update staff for all groups", async () => {
    const staff = await createStaff({
      group: "a",
    });

    const request = createShopifyExpress(staffRouteUpdate);
    const res = await request
      .put(`/staff/${staff._id}`)
      .send({
        fullname: "jamal",
        group: "test",
        role: StaffRole.admin,
      })
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.fullname).toEqual("jamal");
    expect(res.body.payload.group).toEqual("test");
    expect(res.body.payload.role).toEqual(StaffRole.admin);
  });
});

describe("Application: staff update route test", () => {
  it("User: Should not able to update other staff", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.user,
    });

    const staff = await createStaff({
      group: "a",
    });

    const request = createAppExpress(staffRouteUpdate, loggedInStaff);
    const res = await request
      .put(`/staff/${staff._id}`)
      .send({
        fullname: "jamal",
      })
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
  });

  it("Admin: Should be able to update staff in the same group", async () => {
    const group = "a";
    const loggedInStaff = await createStaff({
      group,
      role: StaffRole.admin,
    });

    const staff = await createStaff({
      group,
    });

    const request = createAppExpress(staffRouteUpdate, loggedInStaff);
    const res = await request
      .put(`/staff/${staff._id}`)
      .send({
        fullname: "jamal",
        group,
        role: StaffRole.admin,
      })
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.fullname).toEqual("jamal");
    expect(res.body.payload.role).toEqual(StaffRole.user);
  });

  it("Admin: Should NOT be able to update staff in other group", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.admin,
    });

    const staff = await createStaff({
      group: "b",
    });

    const request = createAppExpress(staffRouteUpdate, loggedInStaff);
    const res = await request
      .put(`/staff/${staff._id}`)
      .send({
        fullname: "jamal",
        group: "test",
        role: StaffRole.admin,
      })
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
  });
});
