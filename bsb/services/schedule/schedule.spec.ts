import { faker } from "@faker-js/faker";
import { createStaff, shop } from "@jamalsoueidan/bsd.testing-library.mongodb";
import { addDays, addHours, endOfDay, startOfDay } from "date-fns";
import {
  ScheduleServiceCreate,
  ScheduleServiceCreateOne,
  ScheduleServiceFindByIdAndUpdate,
  ScheduleServiceGetByDateRange,
} from "./schedule";

require("@jamalsoueidan/bsd.testing-library.mongodb/mongodb.jest");

const productId = parseInt(faker.random.numeric(10), 10);
const tag = faker.random.word();

describe("schedule service test", () => {
  it("Should be able to add one schedule and get it by date range", async () => {
    const staff = await createStaff();

    await ScheduleServiceCreate({
      staff: staff._id,
      shop,
      schedules: {
        start: new Date(),
        end: addHours(new Date(), 6),
        tag,
      },
    });

    const schedules = await ScheduleServiceGetByDateRange({
      staff: staff._id,
      shop,
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
    });

    expect(schedules.length).toEqual(1);
  });

  it("should be able to update schedule", async () => {
    const staff = await createStaff();

    const schedule = await ScheduleServiceCreateOne({
      staff: staff._id,
      shop,
      start: new Date(),
      end: addHours(new Date(), 6),
      tag,
    });

    const start = addDays(new Date(), 1);
    const end = addHours(start, 1);
    const updated = await ScheduleServiceFindByIdAndUpdate({
      query: {
        scheduleId: schedule._id,
      },
      body: {
        start,
        end,
      },
    });

    expect(updated?.start).toStrictEqual(start);
    expect(updated?.end).toStrictEqual(end);
  });
});
