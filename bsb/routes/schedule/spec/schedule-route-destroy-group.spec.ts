import { StaffRole } from "@jamalsoueidan/bsb.types.staff";
import { Tag } from "@jamalsoueidan/bsb.types.tag";
import {
  createAppExpress,
  createShopifyExpress,
} from "@jamalsoueidan/bsd.testing-library.express";
import {
  createStaff,
  createStaffWithScheduleGroup,
} from "@jamalsoueidan/bsd.testing-library.mongodb";
import { scheduleRouteDestroyGroup } from "../schedule.routes";

require("@jamalsoueidan/bsd.testing-library.mongodb/mongodb.jest");

const group = "a";
const tag = Tag.all_day;

describe("Shopify: schedule delete group route test", () => {
  it("Should be able to delete group for all users", async () => {
    const { staff, schedules } = await createStaffWithScheduleGroup({ tag });

    const request = createShopifyExpress(scheduleRouteDestroyGroup);
    const res = await request
      .delete(`/schedules/group/${schedules[0].groupId}?staff=${staff.id}`)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.deletedCount).toEqual(3);
  });
});

describe("Application: schedule delete group route test", () => {
  it("User: Should able to delete group for himself", async () => {
    const { staff: loggedInStaff, schedules } =
      await createStaffWithScheduleGroup({
        group,
        role: StaffRole.user,
        tag,
      });

    const request = createAppExpress(scheduleRouteDestroyGroup, loggedInStaff);
    const res = await request
      .delete(
        `/schedules/group/${schedules[0].groupId}?staff=${loggedInStaff.id}`,
      )
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.deletedCount).toEqual(3);
  });

  it("User: Should not able to delete group for other staff", async () => {
    const loggedInStaff = await createStaff({
      group,
      role: StaffRole.user,
    });

    const { staff, schedules } = await createStaffWithScheduleGroup({
      group: "b",
      role: StaffRole.user,
      tag,
    });

    const request = createAppExpress(scheduleRouteDestroyGroup, loggedInStaff);
    const res = await request
      .delete(`/schedules/group/${schedules[0].groupId}?staff=${staff.id}`)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeFalsy();
  });

  it("Admin: Should be able to delete group for staff in the same group", async () => {
    const loggedInStaff = await createStaff({
      group,
      role: StaffRole.admin,
    });

    const { staff, schedules } = await createStaffWithScheduleGroup({
      group,
      role: StaffRole.user,
      tag,
    });

    const request = createAppExpress(scheduleRouteDestroyGroup, loggedInStaff);
    const res = await request
      .delete(`/schedules/group/${schedules[0].groupId}?staff=${staff.id}`)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.deletedCount).toEqual(3);
  });

  it("Admin: Should NOT be able to delete group for staff in other group", async () => {
    const loggedInStaff = await createStaff({
      group,
      role: StaffRole.admin,
    });

    const { staff, schedules } = await createStaffWithScheduleGroup({
      group: "b",
      role: StaffRole.user,
      tag,
    });

    const request = createAppExpress(scheduleRouteDestroyGroup, loggedInStaff);
    const res = await request
      .delete(`/schedules/group/${schedules[0].groupId}?staff=${staff.id}`)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeFalsy();
  });
});
