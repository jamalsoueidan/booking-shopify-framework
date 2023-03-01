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
import { setHours } from "date-fns";
import { scheduleRouteDestroy } from "../schedule.routes";

require("@jamalsoueidan/bit-dev.testing-library.mongodb/mongodb.jest");

const group = "a";
const tag = Tag.all_day;
const date = setHours(new Date(), 10);
const start = date.toJSON();
const end = setHours(date, 16).toJSON();

describe("Shopify: schedule delete route test", () => {
  it("Should be able to delete schedule for all users", async () => {
    const { staff, schedule } = await createStaffWithSchedule({ tag });

    const request = createShopifyExpress(scheduleRouteDestroy);
    const res = await request
      .delete(`/schedules/${schedule.id}?staff=${staff.id}`)
      .send({
        end,
        start,
      })
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.deletedCount).toEqual(1);
  });
});

describe("Application: schedule delete route test", () => {
  it("User: Should able to delete schedule for himself", async () => {
    const { staff: loggedInStaff, schedule } = await createStaffWithSchedule({
      group,
      role: StaffRole.user,
      tag,
    });

    const request = createAppExpress(scheduleRouteDestroy, loggedInStaff);
    const res = await request
      .delete(`/schedules/${schedule.id}?staff=${loggedInStaff.id}`)
      .send({
        end,
        start,
        tag,
      })
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.deletedCount).toEqual(1);
  });

  it("User: Should not able to delete schedule for other staff", async () => {
    const loggedInStaff = await createStaff({
      group,
      role: StaffRole.user,
    });

    const { staff, schedule } = await createStaffWithSchedule({
      group,
      role: StaffRole.user,
      tag,
    });

    const request = createAppExpress(scheduleRouteDestroy, loggedInStaff);
    const res = await request
      .delete(`/schedules/${schedule.id}?staff=${staff.id}`)
      .send({
        end,
        start,
        tag,
      })
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeFalsy();
  });

  it("Admin: Should be able to delete schedule for staff in the same group", async () => {
    const loggedInStaff = await createStaff({
      group,
      role: StaffRole.admin,
    });

    const { staff, schedule } = await createStaffWithSchedule({
      group,
      role: StaffRole.user,
      tag,
    });

    const request = createAppExpress(scheduleRouteDestroy, loggedInStaff);
    const res = await request
      .delete(`/schedules/${schedule.id}?staff=${staff.id}`)
      .send({
        end,
        start,
        tag,
      })
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.deletedCount).toEqual(1);
  });

  it("Admin: Should NOT be able to delete staff in other group", async () => {
    const loggedInStaff = await createStaff({
      group,
      role: StaffRole.admin,
    });

    const { staff, schedule } = await createStaffWithSchedule({
      group: "b",
      role: StaffRole.user,
      tag,
    });

    const request = createAppExpress(scheduleRouteDestroy, loggedInStaff);
    const res = await request
      .delete(`/schedules/${schedule.id}?staff=${staff.id}`)
      .send({
        end,
        start,
        tag,
      })
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeFalsy();
  });
});
