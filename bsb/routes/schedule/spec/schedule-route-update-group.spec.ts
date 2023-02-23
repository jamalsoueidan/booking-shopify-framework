import { StaffRole } from "@jamalsoueidan/bsb.types.staff";
import { Tag } from "@jamalsoueidan/bsb.types.tag";
import {
  createAppExpress,
  createShopifyExpress,
} from "@jamalsoueidan/bsd.testing-library.express";
import {
  createStaff,
  createStaffWithSchedule,
} from "@jamalsoueidan/bsd.testing-library.mongodb";
import { setHours } from "date-fns";
import { scheduleRouteUpdateGroup } from "../schedule.routes";

require("@jamalsoueidan/bsd.testing-library.mongodb/mongodb.jest");

const group = "a";
const tag = Tag.all_day;
const date = setHours(new Date(), 10);
const start = date.toJSON();
const end = setHours(date, 16).toJSON();

describe("Shopify: schedule update group route test", () => {
  it("Should be able to update group for all users", async () => {
    const { staff, schedule } = await createStaffWithSchedule({ tag });

    const request = createShopifyExpress(scheduleRouteUpdateGroup);
    const res = await request
      .put(`/schedules/group/${schedule.groupId}?staff=${staff.id}`)
      .send({
        end,
        start,
      })
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
  });
});

describe("Application: schedule update group route test", () => {
  it("User: Should able to update group for himself", async () => {
    const { staff: loggedInStaff, schedule } = await createStaffWithSchedule({
      group,
      role: StaffRole.user,
      tag,
    });

    const request = createAppExpress(scheduleRouteUpdateGroup, loggedInStaff);
    const res = await request
      .put(`/schedules/group/${schedule.groupId}?staff=${loggedInStaff.id}`)
      .send({
        end,
        start,
        tag,
      })
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
  });

  it("User: Should not able to update group for other staff", async () => {
    const loggedInStaff = await createStaff({
      group,
      role: StaffRole.user,
    });

    const { staff, schedule } = await createStaffWithSchedule({
      group,
      role: StaffRole.user,
      tag,
    });

    const request = createAppExpress(scheduleRouteUpdateGroup, loggedInStaff);
    const res = await request
      .put(`/schedules/group/${schedule.groupId}?staff=${staff.id}`)
      .send({
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

    const { staff, schedule } = await createStaffWithSchedule({
      group,
      role: StaffRole.user,
      tag,
    });

    const request = createAppExpress(scheduleRouteUpdateGroup, loggedInStaff);
    const res = await request
      .put(`/schedules/group/${schedule.groupId}?staff=${staff.id}`)
      .send({
        end,
        start,
        tag,
      })
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
  });

  it("Admin: Should NOT be able to update staff in other group", async () => {
    const loggedInStaff = await createStaff({
      group,
      role: StaffRole.admin,
    });

    const { staff, schedule } = await createStaffWithSchedule({
      group: "b",
      role: StaffRole.user,
      tag,
    });

    const request = createAppExpress(scheduleRouteUpdateGroup, loggedInStaff);
    const res = await request
      .put(`/schedules/group/${schedule.groupId}?staff=${staff.id}`)
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
