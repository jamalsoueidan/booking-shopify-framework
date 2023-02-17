import { faker } from "@faker-js/faker";
import {
  addHours,
  eachDayOfInterval,
  endOfMonth,
  setHours,
  startOfMonth,
} from "date-fns";

const fake = {
  __v: 0,
  _id: "63bb72606bc93da9252b66c9",
  customer: {
    customerId: 6730161357117,
    email: "iojads@asd.dk",
    firstName: "first name",
    lastName: "iojasd",
    phone: null,
  },
  end: addHours(new Date(), 1),
  fulfillmentStatus: "booked",
  product: {
    _id: "63bb724704ea5dd4aeae6cd1",
    active: true,
    buffertime: 0,
    collectionId: 425845817661,
    duration: 60,
    hidden: false,
    productId: 8006173360445,
    shop: "testeriphone.myshopify.com",
    staff: [
      {
        _id: "63bb724e6bc93da9252b66b2",
        staff: "63bb71c898f50e4f24c883a8",
        tag: "#4b6043",
      },
      {
        _id: "63bb724e6bc93da9252b66b3",
        staff: "63bb71e798f50e4f24c883b9",
        tag: "#4b6043",
      },
    ],
    title: "Brudekonsultation",
  },
  productId: 8006173360445,
  shop: "testeriphone.myshopify.com",
  staff: {
    __v: 0,
    _id: "63bb71c898f50e4f24c883a8",
    active: true,
    address: "jiodaw",
    avatar:
      "https://gravatar.com/avatar/fcaa4e79f13775916c744afe85129170?s=400&d=robohash&r=x",
    email: "jamal@soueidan.com",
    fullname: "jamalsoueidan",
    group: "all",
    phone: "4531317428",
    position: "1",
    postal: 9000,
    shop: "testeriphone.myshopify.com",
  },
  start: new Date(),
  title: "Brudekonsultation",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

const result = eachDayOfInterval({
  end: endOfMonth(new Date()),
  start: startOfMonth(new Date()),
});

const picked = faker.helpers.arrayElements(result, 10);

const data = picked.map((date) => {
  const start = setHours(date, faker.datatype.number({ max: 24, min: 1 }));
  return {
    ...fake,
    end: addHours(start, 1),
    start,
  };
});

export default data;
