import { Tag } from "@jamalsoueidan/bsb.types.tag";
import { createShopifyExpress } from "@jamalsoueidan/bsd.testing-library.express";
import { createStaffWithScheduleGroup } from "@jamalsoueidan/bsd.testing-library.mongodb";
import { scheduleRouteGetGroup } from "../schedule.routes";

require("@jamalsoueidan/bsd.testing-library.mongodb/mongodb.jest");

const tag = Tag.all_day;

describe("Shopify: schedule create group route test", () => {
  it("Should be able to get group", async () => {
    const { staff, schedules } = await createStaffWithScheduleGroup({ tag });

    const request = createShopifyExpress(scheduleRouteGetGroup);
    const res = await request
      .get(`/schedules/group/${schedules[0].groupId}?staff=${staff.id}`)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.end).toStrictEqual(
      schedules[schedules.length - 1].end.toJSON(),
    );
  });
});
