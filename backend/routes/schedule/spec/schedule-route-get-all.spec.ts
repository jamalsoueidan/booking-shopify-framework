import { StaffRole } from "@jamalsoueidan/backend.types.staff";
import { Tag } from "@jamalsoueidan/backend.types.tag";
import {
  createAppExpress,
  createShopifyExpress,
} from "@jamalsoueidan/bit-dev.testing-library.express";
import {
  createStaff,
  createStaffWithSchedule,
} from "@jamalsoueidan/bit-dev.testing-library.mongodb";
import { scheduleRouteGetAll } from "../schedule.routes";

require("@jamalsoueidan/bit-dev.testing-library.mongodb/mongodb.jest");

const tag = Tag.all_day;
const group = "a";

describe("Shopify: schedule get all route test", () => {
  it("Should be able to get all bookings", async () => {
    const { staff, schedule } = await createStaffWithSchedule({ tag });

    const request = createShopifyExpress(scheduleRouteGetAll);
    const res = await request
      .get(
        `/schedules?start=${schedule.start.toJSON()}&end=${schedule.end.toJSON()}&staff=${
          staff._id
        }`,
      )
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.length).toBeGreaterThan(0);
  });

  it("Should throw error when end param is missing", async () => {
    const request = createShopifyExpress(scheduleRouteGetAll);

    const res = await request
      .get(`/schedules?start=${new Date().toJSON()}`)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeFalsy();
  });

  it("Should throw error when start param is missing", async () => {
    const request = createShopifyExpress(scheduleRouteGetAll);

    const res = await request
      .get(`/schedules?end=${new Date().toJSON()}`)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeFalsy();
  });

  it("Should throw error when staff param is missing", async () => {
    const request = createShopifyExpress(scheduleRouteGetAll);

    const res = await request
      .get(`/schedules?end=${new Date().toJSON()}&start=${new Date().toJSON()}`)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeFalsy();
  });
});

describe("Application: schedule get all route test", () => {
  it("User: Should be able to get schedule for staff in the same group", async () => {
    const loggedInStaff = await createStaff({
      group,
      role: StaffRole.user,
    });

    const { staff, schedule } = await createStaffWithSchedule({ group, tag });

    const request = createAppExpress(scheduleRouteGetAll, loggedInStaff);
    const res = await request
      .get(
        `/schedules?start=${schedule.start.toJSON()}&end=${schedule.end.toJSON()}&staff=${
          staff._id
        }`,
      )
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.length).toBeGreaterThan(0);
  });

  it("User: Should NOT be able to get schedule for staff in other groups", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.user,
    });

    const { staff, schedule } = await createStaffWithSchedule({
      group: "b",
      tag,
    });

    const request = createAppExpress(scheduleRouteGetAll, loggedInStaff);
    const res = await request
      .get(
        `/schedules?start=${schedule.start.toJSON()}&end=${schedule.end.toJSON()}&staff=${
          staff._id
        }`,
      )
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeFalsy();
  });

  it("Admin: Should NOT be able to get schedule for staff in other groups", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.admin,
    });

    const { staff, schedule } = await createStaffWithSchedule({
      group: "b",
      tag,
    });

    const request = createAppExpress(scheduleRouteGetAll, loggedInStaff);
    const res = await request
      .get(
        `/schedules?start=${schedule.start.toJSON()}&end=${schedule.end.toJSON()}&staff=${
          staff._id
        }`,
      )
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeFalsy();
  });
});
