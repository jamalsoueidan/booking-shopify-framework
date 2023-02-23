import { StaffRole } from "@jamalsoueidan/bsb.types.staff";
import { Tag } from "@jamalsoueidan/bsb.types.tag";
import { createAppExpress } from "@jamalsoueidan/bsd.testing-library.express";
import {
  createStaff,
  createStaffWithSchedule,
} from "@jamalsoueidan/bsd.testing-library.mongodb";
import { setHours } from "date-fns";
import { scheduleRouteDestroyGroup } from "../schedule.routes";

require("@jamalsoueidan/bsd.testing-library.mongodb/mongodb.jest");

const group = "a";
const tag = Tag.all_day;
const date = setHours(new Date(), 10);
const start = date.toJSON();
const end = setHours(date, 16).toJSON();

describe("Shopify: schedule delete group route test", () => {
  it("Should be able to delete group for all users", async () => {
    /*const { staff, schedule } = await createStaffWithScheduleGroup({ tag });

    const request = createShopifyExpress(scheduleRouteDestroyGroup);
    const res = await request
      .delete(`/schedules/group/${schedule.groupId}?staff=${staff.id}`)
      .set("Accept", "application/json");

    console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.deletedCount).toEqual(1);*/
  });
});

describe("Application: schedule delete group route test", () => {
  it("User: Should able to delete group for himself", async () => {
    const { staff: loggedInStaff, schedule } = await createStaffWithSchedule({
      group,
      role: StaffRole.user,
      tag,
    });

    const request = createAppExpress(scheduleRouteDestroyGroup, loggedInStaff);
    const res = await request
      .delete(`/schedules/group/${schedule.groupId}?staff=${loggedInStaff.id}`)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.deletedCount).toEqual(1);
  });

  it("User: Should not able to delete group for other staff", async () => {
    const loggedInStaff = await createStaff({
      group,
      role: StaffRole.user,
    });

    const { staff, schedule } = await createStaffWithSchedule({
      group,
      role: StaffRole.user,
      tag,
    });

    const request = createAppExpress(scheduleRouteDestroyGroup, loggedInStaff);
    const res = await request
      .delete(`/schedules/group/${schedule.groupId}?staff=${staff.id}`)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeFalsy();
  });

  it("Admin: Should be able to delete group for staff in the same group", async () => {
    const loggedInStaff = await createStaff({
      group,
      role: StaffRole.admin,
    });

    const { staff, schedule } = await createStaffWithSchedule({
      group,
      role: StaffRole.user,
      tag,
    });

    const request = createAppExpress(scheduleRouteDestroyGroup, loggedInStaff);
    const res = await request
      .delete(`/schedules/group/${schedule.groupId}?staff=${staff.id}`)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.deletedCount).toEqual(1);
  });

  it("Admin: Should NOT be able to delete group for staff in other group", async () => {
    const loggedInStaff = await createStaff({
      group,
      role: StaffRole.admin,
    });

    const { staff, schedule } = await createStaffWithSchedule({
      group: "b",
      role: StaffRole.user,
      tag,
    });

    const request = createAppExpress(scheduleRouteDestroyGroup, loggedInStaff);
    const res = await request
      .delete(`/schedules/group/${schedule.groupId}?staff=${staff.id}`)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeFalsy();
  });
});
