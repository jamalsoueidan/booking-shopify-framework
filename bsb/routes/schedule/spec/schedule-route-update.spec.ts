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
import { setHours, setMilliseconds, setSeconds } from "date-fns";
import { scheduleRouteUpdate } from "../schedule.routes";

require("@jamalsoueidan/bsd.testing-library.mongodb/mongodb.jest");

const group = "a";
const tag = Tag.all_day;
const date = setHours(new Date(), 10);
const start = date.toJSON();
const end = setHours(date, 16).toJSON();

describe("Shopify: schedule update route test", () => {
  it("Should be able to update schedule for all users", async () => {
    const { staff, schedule } = await createStaffWithSchedule({ tag });

    const request = createShopifyExpress(scheduleRouteUpdate);
    const res = await request
      .put(`/schedules/${schedule.id}?staff=${staff.id}`)
      .send({
        end,
        start,
      })
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.start).toEqual(
      setSeconds(setMilliseconds(date, 0), 0).toJSON(),
    );
  });
});

describe("Application: schedule update route test", () => {
  it("User: Should able to update schedule for himself", async () => {
    const { staff: loggedInStaff, schedule } = await createStaffWithSchedule({
      group,
      role: StaffRole.user,
      tag,
    });

    const request = createAppExpress(scheduleRouteUpdate, loggedInStaff);
    const res = await request
      .put(`/schedules/${schedule.id}?staff=${loggedInStaff.id}`)
      .send({
        end,
        start,
        tag,
      })
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.start).toEqual(
      setSeconds(setMilliseconds(date, 0), 0).toJSON(),
    );
  });

  it("User: Should not able to update schedule for other staff", async () => {
    const loggedInStaff = await createStaff({
      group,
      role: StaffRole.user,
    });

    const { staff, schedule } = await createStaffWithSchedule({
      group,
      role: StaffRole.user,
      tag,
    });

    const request = createAppExpress(scheduleRouteUpdate, loggedInStaff);
    const res = await request
      .put(`/schedules/${schedule.id}?staff=${staff.id}`)
      .send({
        end,
        start,
        tag,
      })
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeFalsy();
  });

  it("Admin: Should be able to update schedule for staff in the same group", async () => {
    const loggedInStaff = await createStaff({
      group,
      role: StaffRole.admin,
    });

    const { staff, schedule } = await createStaffWithSchedule({
      group,
      role: StaffRole.user,
      tag,
    });

    const request = createAppExpress(scheduleRouteUpdate, loggedInStaff);
    const res = await request
      .put(`/schedules/${schedule.id}?staff=${staff.id}`)
      .send({
        end,
        start,
        tag,
      })
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.start).toEqual(
      setSeconds(setMilliseconds(date, 0), 0).toJSON(),
    );
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

    const request = createAppExpress(scheduleRouteUpdate, loggedInStaff);
    const res = await request
      .put(`/schedules/${schedule.id}?staff=${staff.id}`)
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
