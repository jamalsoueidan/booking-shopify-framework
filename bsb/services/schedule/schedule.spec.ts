import { faker } from "@faker-js/faker";
import { createStaff, shop } from "@jamalsoueidan/bsd.testing-library.mongodb";
import {
  addDays,
  addHours,
  endOfToday,
  setHours,
  startOfToday,
} from "date-fns";
import {
  ScheduleServiceCreate,
  ScheduleServiceCreateGroup,
  ScheduleServiceDestroy,
  ScheduleServiceDestroyGroup,
  ScheduleServiceGetAll,
  ScheduleServiceUpdate,
  ScheduleServiceUpdateGroup,
} from "./schedule";

require("@jamalsoueidan/bsd.testing-library.mongodb/mongodb.jest");

const tag = faker.random.word();

describe("schedule service test", () => {
  it("Should be able to add one schedule and get it by date range", async () => {
    const staff = await createStaff();

    await ScheduleServiceCreate(
      {
        shop,
        staff: staff._id,
      },
      {
        end: endOfToday(),
        start: startOfToday(),
        tag,
      },
    );

    const schedules = await ScheduleServiceGetAll({
      end: endOfToday(),
      shop,
      staff: staff._id,
      start: startOfToday(),
    });

    expect(schedules.length).toEqual(1);
  });

  it("should be able to update schedule", async () => {
    const staff = await createStaff();

    const schedule = await ScheduleServiceCreate(
      {
        shop,
        staff: staff._id,
      },
      {
        end: addHours(new Date(), 6),
        start: new Date(),
        tag,
      },
    );

    const start = addDays(new Date(), 1);
    const end = addHours(start, 1);
    const updated = await ScheduleServiceUpdate(
      {
        schedule: schedule._id,
        shop,
        staff: staff._id,
      },
      {
        end,
        start,
      },
    );

    expect(updated?.start).toStrictEqual(start);
    expect(updated?.end).toStrictEqual(end);
  });

  it("Should be able to create group schedule and get them by date range", async () => {
    const staff = await createStaff();

    await ScheduleServiceCreateGroup(
      {
        shop,
        staff: staff._id,
      },
      [
        {
          end: endOfToday(),
          start: startOfToday(),
          tag,
        },
        {
          end: addDays(endOfToday(), 1),
          start: addDays(startOfToday(), 1),
          tag,
        },
      ],
    );

    const schedules = await ScheduleServiceGetAll({
      end: addDays(endOfToday(), 1),
      shop,
      staff: staff._id,
      start: startOfToday(),
    });

    expect(schedules.length).toEqual(2);

    const groupIds = schedules.map((s) => s.groupId);
    const unqiue = [...new Set(groupIds)];
    expect(unqiue.length).toEqual(1);
  });

  it("Should be able to create group schedule and update them", async () => {
    const staff = await createStaff();

    const createdSchedules = await ScheduleServiceCreateGroup(
      {
        shop,
        staff: staff._id,
      },
      [
        {
          end: endOfToday(),
          start: startOfToday(),
          tag,
        },
        {
          end: addDays(endOfToday(), 1),
          start: addDays(startOfToday(), 1),
          tag,
        },
      ],
    );

    const start = setHours(new Date(), 10);
    const end = setHours(new Date(), 17);

    await ScheduleServiceUpdateGroup(
      {
        groupId: createdSchedules[0].groupId || "",
        shop,
        staff: staff._id,
      },
      {
        end,
        start,
        tag: "jamal",
      },
    );

    const updateSchedules = await ScheduleServiceGetAll({
      end: addDays(endOfToday(), 1),
      shop,
      staff: staff._id,
      start: startOfToday(),
    });

    expect(start.getHours()).toEqual(updateSchedules[0].start.getHours());
    expect(start.getMinutes()).toEqual(updateSchedules[0].start.getMinutes());
    expect(start.getHours()).toEqual(updateSchedules[1].start.getHours());
    expect(start.getMinutes()).toEqual(updateSchedules[1].start.getMinutes());
  });

  it("Should be able to delete schedule", async () => {
    const staff = await createStaff();

    const schedule = await ScheduleServiceCreate(
      {
        shop,
        staff: staff._id,
      },
      {
        end: endOfToday(),
        start: startOfToday(),
        tag,
      },
    );

    const destroyed = await ScheduleServiceDestroy({
      schedule: schedule._id.toString(),
      shop,
      staff: staff._id.toString(),
    });

    expect(destroyed.deletedCount).toBe(1);
  });

  it("Should be able to delete group schedule", async () => {
    const staff = await createStaff();

    const createdSchedules = await ScheduleServiceCreateGroup(
      {
        shop,
        staff: staff._id,
      },
      [
        {
          end: endOfToday(),
          start: startOfToday(),
          tag,
        },
        {
          end: addDays(endOfToday(), 1),
          start: addDays(startOfToday(), 1),
          tag,
        },
      ],
    );

    const groupId = createdSchedules[0].groupId || "";

    const destroyed = await ScheduleServiceDestroyGroup({
      groupId,
      shop,
      staff: staff._id.toString(),
    });

    expect(destroyed.deletedCount).toBe(2);
  });
});
