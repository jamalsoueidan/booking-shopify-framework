import {
  SmsDkApiCancel,
  SmsDkApiSend,
} from "@jamalsoueidan/backend.api.sms-dk";
import {
  BookingServiceCreate,
  BookingServiceUpdate,
  IBookingDocument,
} from "@jamalsoueidan/backend.services.booking";
import { IStaffDocument } from "@jamalsoueidan/backend.services.staff";
import { Tag } from "@jamalsoueidan/backend.types.tag";
import {
  clearDatabase,
  connect,
  createCustomer,
  createProduct,
  createSchedule,
  createStaff,
  disconnect,
  shop,
} from "@jamalsoueidan/bit-dev.testing-library.mongodb";
import { addHours, addMonths } from "date-fns";
import waitForExpect from "wait-for-expect";
import { NotificationServiceGet } from "./notification";

let booking: IBookingDocument;
let staff: IStaffDocument;

beforeAll(() => connect());
afterAll(async () => {
  await clearDatabase();
  return disconnect();
});

describe("notification service test", () => {
  it("When creating booking, must send 3 notifications", async () => {
    booking = await createData();

    await waitForExpect(() => {
      expect(SmsDkApiSend).toHaveBeenCalledTimes(3);
    });

    const notifications = await NotificationServiceGet({
      lineItemId: booking.lineItemId,
      orderId: booking.orderId,
      shop,
    });

    expect(notifications.filter((n) => n.status === "success").length).toBe(1);
    expect(notifications.filter((n) => n.status === "pending").length).toBe(2);
  });

  it("When updating booking, must cancel all previous scheduled notifications and send 2 new scheduled notifications", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (SmsDkApiSend as any).mockClear();

    const start = addMonths(new Date(), 1);

    await BookingServiceUpdate(
      {
        _id: booking._id,
        shop,
      },
      {
        end: addHours(start, 1),
        staff: staff._id.toString(),
        start,
      },
    );

    await waitForExpect(() => {
      expect(SmsDkApiCancel).toHaveBeenCalledTimes(2);
    });

    await waitForExpect(() => {
      expect(SmsDkApiSend).toHaveBeenCalledTimes(3);
    });

    const notifications = await NotificationServiceGet({
      lineItemId: booking.lineItemId,
      orderId: booking.orderId,
      shop,
    });

    expect(notifications.filter((n) => n.status === "cancelled").length).toBe(
      2,
    );
    expect(notifications.filter((n) => n.status === "pending").length).toBe(2);
  });
});

jest.mock("@jamalsoueidan/backend.api.sms-dk", () => ({
  SmsDkApiCancel: jest.fn(() =>
    Promise.resolve({
      result: {
        batchId: Date.now() + Math.random(),
      },
      status: "success",
    }),
  ),
  SmsDkApiSend: jest.fn(() =>
    Promise.resolve({
      result: {
        batchId: Date.now() + Math.random(),
      },
      status: "success",
    }),
  ),
  __esModule: true,
}));

const createData = async () => {
  const productId = 123456789;
  const tag = Tag.end_of_week;

  await createProduct({ productId });

  staff = await createStaff();

  await createSchedule({
    end: addHours(new Date(), 5),
    staff: staff._id,
    start: new Date(),
    tag,
  });

  const customer = await createCustomer();

  return BookingServiceCreate({
    customerId: customer.customerId,
    end: new Date("2023-11-29T12:15:00.000Z"),
    productId,
    shop,
    staff: staff._id.toString(),
    start: new Date("2023-11-29T11:15:00.000Z"),
  });
};
