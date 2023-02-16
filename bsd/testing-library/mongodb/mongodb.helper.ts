import { faker } from "@faker-js/faker";
import { BookingModel } from "@jamalsoueidan/bsb.services.booking";
import { CustomerModel } from "@jamalsoueidan/bsb.services.customer";
import {
  IProductDocument,
  ProductModel,
  ProductServiceUpdate,
} from "@jamalsoueidan/bsb.services.product";
import { ScheduleServiceCreate } from "@jamalsoueidan/bsb.services.schedule";
import { StaffServiceCreate } from "@jamalsoueidan/bsb.services.staff";
import { Tag } from "@jamalsoueidan/bsb.types";
import {
  addHours,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds,
} from "date-fns";

export const shop = "testeriphone.myshopify.com";

const resetTime = (value) =>
  setMinutes(setSeconds(setMilliseconds(value, 0), 0), 30);

export const createCustomer = () => {
  const customer = new CustomerModel({
    customerId: parseInt(faker.random.numeric(10), 10),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phone: "+4531317411",
    shop,
  });
  return customer.save();
};

export const createStaff = () =>
  StaffServiceCreate({
    active: true,
    address: "asdiojdsajioadsoji",
    avatar: "http://",
    email: faker.internet.email(),
    fullname: faker.name.fullName(),
    group: "all",
    phone: "+4531317411",
    position: "2",
    postal: 8000,
    shop,
  });

export const createProduct = ({ productId, duration = 45, buffertime = 15 }) =>
  ProductModel.create({
    buffertime,
    collectionId: parseInt(faker.random.numeric(10), 10),
    duration,
    productId,
    shop,
    title: faker.company.name(),
  });

export const createStaffWithBooking = async ({
  productId,
}: {
  productId: number;
}) => {
  const staff = await createStaff();

  const booking = await createBooking({
    productId,
    staff: staff._id,
  });

  return { booking, staff };
};

type CreateBookingProps = {
  productId: number;
  staff: string;
  start?: Date;
  end?: Date;
};

export const createBooking = ({
  productId,
  staff,
  start = setHours(new Date(), 15),
  end = setHours(new Date(), 16),
}: CreateBookingProps) =>
  BookingModel.create({
    customerId: 12345,
    end,
    fulfillmentStatus: "refunded",
    lineItemId: 1100,
    lineItemTotal: 1,
    orderId: 1000,
    productId,
    shop,
    staff,
    start,
    title: faker.company.name(),
  });

interface CreateSchedule {
  staff: string;
  tag: Tag;
  start?: Date;
  end?: Date;
}

export const createSchedule = async ({
  staff,
  tag,
  start = resetTime(new Date()),
  end = resetTime(addHours(new Date(), 5)),
}: CreateSchedule) =>
  ScheduleServiceCreate(
    { shop, staff },
    {
      end,
      start,
      tag,
    },
  );

interface CreateStaffWithScheduleProps {
  tag: Tag;
}

export const createStaffWithSchedule = async ({
  tag,
}: CreateStaffWithScheduleProps) => {
  const staff = await createStaff();
  const schedule = await createSchedule({
    staff: staff._id,
    tag,
  });
  return { schedule, staff };
};

interface CreateStaffAndUpdateProductProps {
  product: IProductDocument;
  tag: Tag;
}

export const createStaffWithScheduleAndUpdateProduct = async ({
  product,
  tag,
}: CreateStaffAndUpdateProductProps) => {
  const { staff, schedule } = await createStaffWithSchedule({ tag });
  const updatedProduct = await ProductServiceUpdate(
    {
      id: product._id,
      shop,
    },
    {
      staff: [{ _id: staff._id, tag }],
    },
  );

  return { schedule, staff, updatedProduct };
};
