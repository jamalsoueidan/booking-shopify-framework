import { faker } from "@faker-js/faker";
import { ProductServiceUpdate } from "@jamalsoueidan/bsb.services.product";
import { Tag } from "@jamalsoueidan/bsb.types.tag";
import { WidgetSchedule } from "@jamalsoueidan/bsb.types.widget";
import { createAppExpress } from "@jamalsoueidan/bsd.testing-library.express";
import {
  createBooking,
  createProduct,
  createStaffWithSchedule,
  createStaffWithScheduleAndUpdateProduct,
  shop,
} from "@jamalsoueidan/bsd.testing-library.mongodb";
import { widgetRouteAvailability, widgetRouteStaff } from "../widget.routes";

require("@jamalsoueidan/bsd.testing-library.mongodb/mongodb.jest");

const productId = parseInt(faker.random.numeric(10), 10);

describe("Application: widget staff route user test", () => {
  it("User: Should only be able to get his own user", async () => {
    const product = await createProduct({ productId });
    const tag = Tag.all_day;
    const { staff } = await createStaffWithScheduleAndUpdateProduct({
      group: "a",
      product,
      tag,
    });

    const { staff: staff2 } = await createStaffWithSchedule({
      group: "a",
      tag,
    });

    await ProductServiceUpdate(
      {
        id: product._id,
        shop,
      },
      {
        staff: [
          { _id: staff._id, tag },
          { _id: staff2._id, tag },
        ],
      },
    );

    // create another staff in the same product
    const request = createAppExpress(widgetRouteStaff, staff);

    const res = await request
      .get(`/widget/staff?productId=${product.productId}`)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.payload.length).toEqual(1);
    expect(res.body.payload[0].fullname).toEqual(staff.fullname);
  });

  it("User: Should be able to get availabillities only for his own user", async () => {
    const product = await createProduct({ productId });

    const { staff, schedule } = await createStaffWithScheduleAndUpdateProduct({
      group: "a",
      product,
      tag: Tag.all_day,
    });

    const request = createAppExpress(widgetRouteAvailability, staff);

    const res = await request
      .get(
        `/widget/availability?productId=${
          product.productId
        }&start=${schedule.start.toJSON()}&end=${schedule.end.toJSON()}&staff=${
          staff.id
        }`,
      )
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    const widgetSchedule: WidgetSchedule[] = res.body.payload;
    expect(widgetSchedule).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          date: schedule.start.toJSON(),
        }),
      ]),
    );
  });

  it("User: Should not return booked time in availabilities returned", async () => {
    const product = await createProduct({ productId });

    const { staff, schedule } = await createStaffWithScheduleAndUpdateProduct({
      group: "a",
      product,
      tag: Tag.all_day,
    });

    const request = createAppExpress(widgetRouteAvailability, staff);
    const res = await request
      .get(
        `/widget/availability?productId=${
          product.productId
        }&start=${schedule.start.toJSON()}&end=${schedule.end.toJSON()}&staff=${
          staff._id
        }`,
      )
      .set("Accept", "application/json");

    const widgetSchedules: WidgetSchedule[] = res.body.payload;
    const widgetSchedule = widgetSchedules[0];
    const widgetHour = widgetSchedule.hours[0];

    // create booking
    await createBooking({
      end: widgetHour.end,
      productId,
      staff: staff._id,
      start: widgetHour.start,
    });

    const resNew = await request
      .get(
        `/widget/availability?productId=${
          product.productId
        }&start=${schedule.start.toJSON()}&end=${schedule.end.toJSON()}&staff=${
          staff._id
        }`,
      )
      .set("Accept", "application/json");

    const updateWidgetSchedule: WidgetSchedule = resNew.body.payload[0];
    expect(updateWidgetSchedule.hours).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          end: widgetHour.end,
          start: widgetHour.start,
        }),
      ]),
    );
  });

  it("User: Should NOT able to get availabillities for another staff", async () => {
    const product = await createProduct({ productId });
    const tag = Tag.all_day;

    const { staff, schedule } = await createStaffWithScheduleAndUpdateProduct({
      group: "a",
      product,
      tag,
    });

    const { staff: staff2 } = await createStaffWithSchedule({
      group: "a",
      tag,
    });
    await ProductServiceUpdate(
      {
        id: product._id,
        shop,
      },
      {
        staff: [
          { _id: staff._id, tag },
          { _id: staff2._id, tag },
        ],
      },
    );

    const request = createAppExpress(widgetRouteAvailability, staff);
    const res = await request
      .get(
        `/widget/availability?productId=${
          product.productId
        }&start=${schedule.start.toJSON()}&end=${schedule.end.toJSON()}&staff=${
          staff2._id
        }`,
      )
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(500);
  });
});
