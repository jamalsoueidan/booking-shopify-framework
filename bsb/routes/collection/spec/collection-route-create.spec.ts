import { StaffRole } from "@jamalsoueidan/bsb.types.staff";
import { createAppExpress } from "@jamalsoueidan/bsd.testing-library.express";
import { createStaff } from "@jamalsoueidan/bsd.testing-library.mongodb";
import { collectionRouteCreate } from "../collection.routes";

require("@jamalsoueidan/bsd.testing-library.mongodb/mongodb.jest");

describe("Application: collection create route test", () => {
  it("User: Should NOT be able to create collections", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.user,
    });

    const request = createAppExpress(collectionRouteCreate, loggedInStaff);
    const res = await request
      .post(`/collections`)
      .send({
        selections: ["asd"],
      })
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeFalsy();
  });

  it("Admin: Should NOT be able to create collections", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.admin,
    });

    const request = createAppExpress(collectionRouteCreate, loggedInStaff);
    const res = await request
      .post(`/collections`)
      .send({
        selections: ["asd"],
      })
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeFalsy();
  });
});
