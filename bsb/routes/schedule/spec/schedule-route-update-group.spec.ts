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
import { addMonths, setHours } from "date-fns";
import { scheduleRouteUpdateGroup } from "../schedule.routes";

require("@jamalsoueidan/bsd.testing-library.mongodb/mongodb.jest");

const group = "a";
const tag = Tag.all_day;
const date = setHours(new Date(), 12);
const start = date.toJSON();
const end = addMonths(setHours(date, 15), 1).toJSON();

describe("Shopify: schedule update group route test", () => {
  it("Should be able to update group for all users", async () => {
    const { staff, schedules } = await createStaffWithScheduleGroup({ tag });

    const request = createShopifyExpress(scheduleRouteUpdateGroup);
    const res = await request
      .put(`/schedules/group/${schedules[0].groupId}?staff=${staff.id}`)
      .send({
        days: ["thursday", "friday"],
        end,
        start,
        tag,
      })
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.length).toBe(9);
  });

  it("Should NOT be able to update group with invalid props", async () => {
    const { staff, schedules } = await createStaffWithScheduleGroup({ tag });

    const request = createShopifyExpress(scheduleRouteUpdateGroup);
    const res = await request
      .put(`/schedules/group/${schedules[0].groupId}?staff=${staff.id}`)
      .send({
        days: [],
        end: "",
        start: "",
        tag,
      })
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeFalsy();
    expect(res.body.error.days).toBeDefined();
    expect(res.body.error.start).toBeDefined();
    expect(res.body.error.end).toBeDefined();
  });
});

describe("Application: schedule update group route test", () => {
  it("User: Should able to update group for himself", async () => {
    const { staff: loggedInStaff, schedules } =
      await createStaffWithScheduleGroup({
        group,
        role: StaffRole.user,
        tag,
      });

    const request = createAppExpress(scheduleRouteUpdateGroup, loggedInStaff);
    const res = await request
      .put(`/schedules/group/${schedules[0].groupId}?staff=${loggedInStaff.id}`)
      .send({
        days: ["monday"],
        end,
        start,
        tag,
      })
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.length).toBeGreaterThan(1);
  });

  it("User: Should not able to update group for other staff", async () => {
    const loggedInStaff = await createStaff({
      group,
      role: StaffRole.user,
    });

    const { staff, schedules } = await createStaffWithScheduleGroup({
      group,
      role: StaffRole.user,
      tag,
    });

    const request = createAppExpress(scheduleRouteUpdateGroup, loggedInStaff);
    const res = await request
      .put(`/schedules/group/${schedules[0].groupId}?staff=${staff.id}`)
      .send({
        days: ["tuesday"],
        end,
        start,
        tag,
      })
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeFalsy();
  });

  it("Admin: Should be able to update group for staff in the same group", async () => {
    const loggedInStaff = await createStaff({
      group,
      role: StaffRole.admin,
    });

    const { staff, schedules } = await createStaffWithScheduleGroup({
      group,
      role: StaffRole.user,
      tag,
    });

    const request = createAppExpress(scheduleRouteUpdateGroup, loggedInStaff);
    const res = await request
      .put(`/schedules/group/${schedules[0].groupId}?staff=${staff.id}`)
      .send({
        days: ["saturday"],
        end,
        start,
        tag,
      })
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.length).toBeGreaterThan(1);
  });

  it("Admin: Should NOT be able to update staff in other group", async () => {
    const loggedInStaff = await createStaff({
      group,
      role: StaffRole.admin,
    });

    const { staff, schedules } = await createStaffWithScheduleGroup({
      group: "b",
      role: StaffRole.user,
      tag,
    });

    const request = createAppExpress(scheduleRouteUpdateGroup, loggedInStaff);
    const res = await request
      .put(`/schedules/group/${schedules[0].groupId}?staff=${staff.id}`)
      .send({
        days: ["saturday", "sunday"],
        end,
        start,
        tag,
      })
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeFalsy();
  });
});
