import { faker } from "@faker-js/faker";
import { StaffRole } from "@jamalsoueidan/bsb.types.staff";
import {
  createAppExpress,
  createShopifyExpress,
} from "@jamalsoueidan/bsd.testing-library.express";
import { createStaff, shop } from "@jamalsoueidan/bsd.testing-library.mongodb";
import { staffRouteCreate } from "../staff.routes";

require("@jamalsoueidan/bsd.testing-library.mongodb/mongodb.jest");

describe("Shopify: staff create route test", () => {
  it("Owner: Should be able to create staff for all groups", async () => {
    const newStaff = {
      active: true,
      address: "asdiojdsajioadsoji",
      avatar: "http://",
      email: faker.internet.email(),
      fullname: faker.name.fullName(),
      group: "test",
      language: "da",
      password: "12345678",
      phone: "+4531317411",
      position: "2",
      postal: 8000,
      role: StaffRole.user,
      shop,
      timeZone: "Europe/Copenhagen",
    };

    const request = createShopifyExpress(staffRouteCreate);
    const res = await request
      .post(`/staff`)
      .send(newStaff)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.fullname).toEqual(newStaff.fullname);
  });
});

describe("Application: staff create route test", () => {
  it("User: Should not able to create staff", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.user,
    });

    const newStaff = {
      active: true,
      address: "asdiojdsajioadsoji",
      avatar: "http://",
      email: faker.internet.email(),
      fullname: faker.name.fullName(),
      group: "test",
      language: "da",
      password: "12345678",
      phone: "+4531317411",
      position: "2",
      postal: 8000,
      role: StaffRole.user,
      shop,
      timeZone: "Europe/Copenhagen",
    };

    const request = createAppExpress(staffRouteCreate, loggedInStaff);
    const res = await request
      .post(`/staff`)
      .send(newStaff)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
  });

  it("Admin: Should be able to create staff in the same group", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.admin,
    });

    const newStaff = {
      active: true,
      address: "asdiojdsajioadsoji",
      avatar: "http://",
      email: faker.internet.email(),
      fullname: faker.name.fullName(),
      group: loggedInStaff.group,
      language: "da",
      password: "12345678",
      phone: "+4531317411",
      position: "2",
      postal: 8000,
      role: StaffRole.user,
      shop,
      timeZone: "Europe/Copenhagen",
    };

    const request = createAppExpress(staffRouteCreate, loggedInStaff);
    const res = await request
      .post(`/staff`)
      .send(newStaff)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.fullname).toEqual(newStaff.fullname);
  });

  it("Admin: Should NOT be able to create staff in other group", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.admin,
    });

    const newStaff = {
      active: true,
      address: "asdiojdsajioadsoji",
      avatar: "http://",
      email: faker.internet.email(),
      fullname: faker.name.fullName(),
      group: "test",
      language: "da",
      password: "12345678",
      phone: "+4531317411",
      position: "2",
      postal: 8000,
      role: StaffRole.user,
      shop,
      timeZone: "Europe/Copenhagen",
    };

    const request = createAppExpress(staffRouteCreate, loggedInStaff);
    const res = await request
      .post(`/staff`)
      .send(newStaff)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
  });
});
