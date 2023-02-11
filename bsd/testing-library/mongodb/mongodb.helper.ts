import { faker } from "@faker-js/faker";
import { CustomerModel } from "@jamalsoueidan/bsb.services.customer";
import {
  IProductDocument,
  ProductModel,
  ProductServiceUpdate,
} from "@jamalsoueidan/bsb.services.product";
import { ScheduleServiceCreate } from "@jamalsoueidan/bsb.services.schedule";
import { StaffServiceCreate } from "@jamalsoueidan/bsb.services.staff";
import { addHours, setMilliseconds, setMinutes, setSeconds } from "date-fns";

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

interface CreateSchedule {
  staff: string;
  tag: string;
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
  tag: string;
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
  tag: string;
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
