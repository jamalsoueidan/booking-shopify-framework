import { faker } from "@faker-js/faker";
import {
  eachDayOfInterval,
  endOfMonth,
  setHours,
  startOfMonth,
} from "date-fns";

const fake = {
  __v: 0,
  _id: "63de6b69769dac4d7455741f",
  end: "2023-02-11T15:00:00.000Z",
  groupId: "1675520873715",
  shop: "testeriphone.myshopify.com",
  staff: "63de6b5b769dac4d74557419",
  start: "2023-02-11T08:00:00.000Z",
  tag: "#235284",
};

const result = eachDayOfInterval({
  start: startOfMonth(new Date()),
  end: endOfMonth(new Date()),
});

const picked = faker.helpers.arrayElements(result, 10);

const data = picked.map((date) => {
  const min = faker.datatype.number({ min: 1, max: 14 });
  const start = setHours(date, min);
  return {
    ...fake,
    start: start,
    end: setHours(start, faker.datatype.number({ min: min + 1, max: 24 })),
  };
});

export default data;
