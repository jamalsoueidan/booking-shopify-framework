import { StaffRole } from "@jamalsoueidan/bsb.types.staff";
import { Tag } from "@jamalsoueidan/bsb.types.tag";
import {
  createAppExpress,
  createShopifyExpress,
} from "@jamalsoueidan/bsd.testing-library.express";
import { createStaff } from "@jamalsoueidan/bsd.testing-library.mongodb";
import { setHours, setMilliseconds, setSeconds } from "date-fns";
import { scheduleRouteCreate } from "../schedule.routes";

require("@jamalsoueidan/bsd.testing-library.mongodb/mongodb.jest");

const group = "a";
const tag = Tag.all_day;
const date = setHours(new Date(), 10);
const start = date.toJSON();
const end = setHours(date, 16).toJSON();

describe("Shopify: schedule create route test", () => {
  it("Should be able to create schedule for all users", async () => {
    const staff = await createStaff();

    const request = createShopifyExpress(scheduleRouteCreate);
    const res = await request
      .post(`/schedules?staff=${staff.id}`)
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
});

describe("Application: schedule create route test", () => {
  it("User: Should able to create schedule for himself", async () => {
    const loggedInStaff = await createStaff({
      group,
      role: StaffRole.user,
    });

    const request = createAppExpress(scheduleRouteCreate, loggedInStaff);
    const res = await request
      .post(`/schedules?staff=${loggedInStaff.id}`)
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

  it("User: Should not able to create schedule for other", async () => {
    const loggedInStaff = await createStaff({
      group,
      role: StaffRole.user,
    });

    const staff = await createStaff({
      group,
      role: StaffRole.user,
    });

    const request = createAppExpress(scheduleRouteCreate, loggedInStaff);
    const res = await request
      .post(`/schedules?staff=${staff.id}`)
      .send({
        end,
        start,
        tag,
      })
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBeFalsy();
  });

  it("Admin: Should be able to create schedule for staff in the same group", async () => {
    const loggedInStaff = await createStaff({
      group,
      role: StaffRole.admin,
    });

    const staff = await createStaff({
      group,
      role: StaffRole.user,
    });

    const request = createAppExpress(scheduleRouteCreate, loggedInStaff);
    const res = await request
      .post(`/schedules?staff=${staff.id}`)
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

  it("Admin: Should NOT be able to create staff in other group", async () => {
    const loggedInStaff = await createStaff({
      group,
      role: StaffRole.admin,
    });

    const staff = await createStaff({
      group: "b",
      role: StaffRole.user,
    });

    const request = createAppExpress(scheduleRouteCreate, loggedInStaff);
    const res = await request
      .post(`/schedules?staff=${staff.id}`)
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
