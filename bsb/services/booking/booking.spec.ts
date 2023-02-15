import { faker } from "@faker-js/faker";
import {
  createStaffWithBooking,
  shop,
} from "@jamalsoueidan/bsd.testing-library.mongodb";
import { endOfDay, startOfDay } from "date-fns";
import { BookingServiceGetAll } from "./booking";

require("@jamalsoueidan/bsd.testing-library.mongodb/mongodb.jest");

const productId = parseInt(faker.random.numeric(10), 10);
const tag = faker.random.word();
describe("booking service test", () => {
  it("Should be able to get bookings for all staff by range", async () => {
    await createStaffWithBooking({ productId });
    await createStaffWithBooking({ productId });
    await createStaffWithBooking({ productId });

    let bookings = await BookingServiceGetAll({
      shop,
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
    });

    expect(bookings.length).toBe(3);
  });

  it("Should be able to get bookings for specific staff", async () => {
    const { staff: staff1 } = await createStaffWithBooking({ productId });
    await createStaffWithBooking({ productId });

    let bookings = await BookingServiceGetAll({
      shop,
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      staff: staff1._id,
    });

    expect(bookings.length).toBe(1);
    expect(bookings[0].staff._id).toEqual(staff1._id);
  });

  it("Should be able to get bookings for few staff", async () => {
    const { staff: staff1 } = await createStaffWithBooking({ productId });
    await createStaffWithBooking({ productId });
    const { staff: staff3 } = await createStaffWithBooking({ productId });

    const staffs = [staff1._id.toString(), staff3._id.toString()];
    let bookings = await BookingServiceGetAll({
      shop,
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      staff: staffs,
    });

    expect(bookings.length).toBe(2);

    const ids = bookings.map((b) => b.staff._id.toString());
    expect(ids).toStrictEqual(staffs);
  });
});
