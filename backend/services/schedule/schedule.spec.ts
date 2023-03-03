import { Tag } from "@jamalsoueidan/backend.types.tag";
import {
  createStaff,
  shop,
} from "@jamalsoueidan/bit-dev.testing-library.mongodb";
import {
  addDays,
  addHours,
  addWeeks,
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
import { resetTime } from "./schedule.helper";

require("@jamalsoueidan/bit-dev.testing-library.mongodb/mongodb.jest");

const tag = Tag.weekday;

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

    expect(updated?.start).toStrictEqual(resetTime(start));
    expect(updated?.end).toStrictEqual(resetTime(end));
  });

  it("Should be able to create group schedule and get them by date range", async () => {
    const staff = await createStaff();

    const start = setHours(startOfToday(), 10);
    const end = addWeeks(setHours(new Date(), 18), 1);
    await ScheduleServiceCreateGroup(
      {
        shop,
        staff: staff._id,
      },
      {
        days: ["thursday"],
        end,
        start,
        tag,
      },
    );

    const schedules = await ScheduleServiceGetAll({
      end,
      shop,
      staff: staff._id,
      start,
    });

    expect(schedules.length).toEqual(1);
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
      {
        days: ["thursday"],
        end: addWeeks(setHours(new Date(), 18), 4),
        start: setHours(startOfToday(), 10),
        tag,
      },
    );

    const updatedSchedules = await ScheduleServiceUpdateGroup(
      {
        groupId: createdSchedules[0].groupId || "",
        shop,
        staff: staff._id,
      },
      {
        days: ["wednesday"],
        end: addWeeks(setHours(new Date(), 20), 2),
        start: setHours(startOfToday(), 12),
        tag,
      },
    );

    const schedules = await ScheduleServiceGetAll({
      end: addWeeks(setHours(new Date(), 20), 4),
      shop,
      staff: staff._id,
      start: startOfToday(),
    });

    expect(createdSchedules.length).toBe(4);
    expect(updatedSchedules.length).toBe(2);
    expect(schedules.length).toBe(2);
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
      {
        days: ["thursday"],
        end: addWeeks(setHours(new Date(), 18), 1),
        start: setHours(startOfToday(), 10),
        tag,
      },
    );

    const groupId = createdSchedules[0].groupId || "";

    const destroyed = await ScheduleServiceDestroyGroup({
      groupId,
      shop,
      staff: staff._id.toString(),
    });

    expect(destroyed.deletedCount).toBe(1);
  });
});
