import {
  BookingServiceCreate,
  BookingServiceGetAll,
  BookingServiceGetById,
  BookingServiceUpdate,
} from "@jamalsoueidan/backend.services.booking";
import {
  AppControllerProps,
  ControllerProps,
} from "@jamalsoueidan/backend.types.api";
import {
  BookingServiceCreateProps,
  BookingServiceGetAllProps,
  BookingServiceGetByIdProps,
  BookingServiceUpdateProps,
} from "@jamalsoueidan/backend.types.booking";

export const bookingGetAll = ({
  query,
}: ControllerProps<BookingServiceGetAllProps>) => BookingServiceGetAll(query);

export const bookingGetById = async ({
  query,
}: ControllerProps<BookingServiceGetByIdProps>) => {
  const booking = await BookingServiceGetById(query);
  if (!booking) {
    throw "booking not exist";
  }
  return booking;
};

export const bookingCreate = ({
  body,
  session,
}: AppControllerProps<never, BookingServiceCreateProps>) =>
  BookingServiceCreate({ ...body, shop: session.shop });

export const bookingUpdate = ({
  query,
  body,
}: ControllerProps<
  BookingServiceUpdateProps["query"],
  BookingServiceUpdateProps["body"]
>) => BookingServiceUpdate(query, body);
