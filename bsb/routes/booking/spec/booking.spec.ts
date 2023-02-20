import { faker } from "@faker-js/faker";
import { AppSession } from "@jamalsoueidan/bsb.types.api";
import { ShopifySession } from "@jamalsoueidan/bsb.types.shopify-session";
import { StaffRole } from "@jamalsoueidan/bsb.types.staff";
import {
  createStaff,
  createStaffWithBooking,
  shop,
} from "@jamalsoueidan/bsd.testing-library.mongodb";
import { endOfDay, startOfDay } from "date-fns";
import { BookingGetAll } from "../booking.routes";

require("@jamalsoueidan/bsd.testing-library.mongodb/mongodb.jest");

const productId = parseInt(faker.random.numeric(10), 10);

describe("booking routes test (embedded-app)", () => {
  it("Should be able to get all bookings by range", async () => {
    await createStaffWithBooking({ group: "a", productId });
    await createStaffWithBooking({ group: "a", productId });
    await createStaffWithBooking({ group: "b", productId });

    const bookings = await BookingGetAll({
      query: {
        end: endOfDay(new Date()),
        shop,
        start: startOfDay(new Date()),
      },
      session: {
        accessToken: "a",
        id: "",
        isOnline: true,
        shop,
        state: "a",
      } as ShopifySession,
    });

    expect(bookings.length).toBe(3);
  });
});
describe("booking routes test (external-app)", () => {
  it("Should be able to get only bookings in the same group by range", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.user,
    });

    await createStaffWithBooking({ group: "a", productId });
    await createStaffWithBooking({ group: "a", productId });
    await createStaffWithBooking({ group: "b", productId });

    const bookings = await BookingGetAll({
      query: {
        end: endOfDay(new Date()),
        shop,
        start: startOfDay(new Date()),
      },
      session: {
        _id: "a",
        group: loggedInStaff.group,
        role: loggedInStaff.role,
        shop,
        staff: loggedInStaff._id.toString(),
      } as AppSession,
    });

    expect(bookings.length).toBe(2);
  });

  it("Should be able to get all bookings when user.role is admin and below", async () => {
    const loggedInStaff = await createStaff({
      group: "a",
      role: StaffRole.owner,
    });

    await createStaffWithBooking({ group: "b", productId });
    await createStaffWithBooking({ group: "c", productId });
    await createStaffWithBooking({ group: "d", productId });

    const bookings = await BookingGetAll({
      query: {
        end: endOfDay(new Date()),
        shop,
        start: startOfDay(new Date()),
      },
      session: {
        _id: "a",
        group: loggedInStaff.group,
        role: loggedInStaff.role,
        shop,
        staff: loggedInStaff._id.toString(),
      } as AppSession,
    });

    expect(bookings.length).toBe(3);
  });
});
