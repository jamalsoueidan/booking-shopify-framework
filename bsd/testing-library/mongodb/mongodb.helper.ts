import { faker } from "@faker-js/faker";
import { BookingModel } from "@jamalsoueidan/bsb.services.booking";
import { CustomerModel } from "@jamalsoueidan/bsb.services.customer";
import {
  IProductDocument,
  ProductModel,
  ProductServiceGetById,
  ProductServiceUpdate,
} from "@jamalsoueidan/bsb.services.product";
import {
  ScheduleServiceCreate,
  ScheduleServiceCreateGroup,
} from "@jamalsoueidan/bsb.services.schedule";
import { StaffServiceCreate } from "@jamalsoueidan/bsb.services.staff";
import { Staff, StaffRole } from "@jamalsoueidan/bsb.types.staff";
import { Tag } from "@jamalsoueidan/bsb.types.tag";
import {
  addHours,
  addWeeks,
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

export const createStaff = (props: Partial<Staff> = {}) =>
  StaffServiceCreate({
    active: true,
    address: "asdiojdsajioadsoji",
    avatar: "http://",
    email: faker.internet.email(),
    fullname: faker.name.fullName(),
    group: "all",
    language: "da",
    password: "12345678",
    phone: "+4531317411",
    position: "2",
    postal: 8000,
    role: StaffRole.user,
    shop,
    timeZone: "Europe/Copenhagen",
    ...props,
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

type CreateStaffWithBookingProps = {
  productId: number;
  group?: string;
};

export const createStaffWithBooking = async ({
  productId,
  group = "all",
}: CreateStaffWithBookingProps) => {
  const staff = await createStaff({ group });

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

export const createBooking = async ({
  productId,
  staff,
  start = setHours(new Date(), 15),
  end = setHours(new Date(), 16),
}: CreateBookingProps) => {
  const customer = await createCustomer();
  return BookingModel.create({
    customerId: customer.customerId,
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
};

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
  group?: string;
  role?: StaffRole;
}

export const createStaffWithSchedule = async ({
  tag,
  group = "all",
  role = StaffRole.user,
}: CreateStaffWithScheduleProps) => {
  const staff = await createStaff({ group, role });
  const schedule = await createSchedule({
    staff: staff._id,
    tag,
  });
  return { schedule, staff };
};

export const createScheduleGroup = ({
  staff,
  tag,
  start = setHours(new Date(), 10),
  end = addWeeks(setHours(new Date(), 16), 1),
}: CreateSchedule) =>
  ScheduleServiceCreateGroup(
    { shop, staff },
    { days: ["monday", "friday"], end, start, tag },
  );

export const createStaffWithScheduleGroup = async ({
  tag,
  group = "all",
  role = StaffRole.user,
}: CreateStaffWithScheduleProps) => {
  const staff = await createStaff({ group, role });
  const schedules = await createScheduleGroup({
    staff: staff._id,
    tag,
  });
  return { schedules, staff };
};

interface CreateStaffAndUpdateProductProps {
  product: IProductDocument;
  tag: Tag;
  group?: string;
  role?: StaffRole;
}

export const createStaffWithScheduleAndUpdateProduct = async ({
  product,
  tag,
  group = "all",
  role = StaffRole.user,
}: CreateStaffAndUpdateProductProps) => {
  const { staff, schedule } = await createStaffWithSchedule({
    group,
    role,
    tag,
  });

  await ProductServiceUpdate(
    {
      id: product._id,
      shop,
    },
    {
      staff: [{ _id: staff._id, tag }],
    },
  );

  const updatedProduct = await ProductServiceGetById({ id: product.id, shop });

  return { schedule, staff, updatedProduct };
};
