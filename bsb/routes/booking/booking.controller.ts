import {
  BookingServiceCreate,
  BookingServiceGetAll,
  BookingServiceGetById,
  BookingServiceUpdate,
} from "@jamalsoueidan/bsb.services.booking";
import {
  AppControllerProps,
  ControllerProps,
} from "@jamalsoueidan/bsb.types.api";
import {
  BookingServiceCreateProps,
  BookingServiceGetAllProps,
  BookingServiceGetByIdProps,
  BookingServiceUpdateProps,
} from "@jamalsoueidan/bsb.types.booking";

export const getAll = ({ query }: ControllerProps<BookingServiceGetAllProps>) =>
  BookingServiceGetAll(query);

export const getById = async ({
  query,
}: ControllerProps<BookingServiceGetByIdProps>) => {
  const booking = await BookingServiceGetById(query);
  if (!booking) {
    throw "booking not exist";
  }
  return booking;
};

export const create = ({
  body,
  session,
}: AppControllerProps<never, BookingServiceCreateProps>) =>
  BookingServiceCreate({ ...body, shop: session.shop });

export const update = ({
  query,
  body,
}: ControllerProps<
  BookingServiceUpdateProps["query"],
  BookingServiceUpdateProps["body"]
>) => BookingServiceUpdate(query, body);
