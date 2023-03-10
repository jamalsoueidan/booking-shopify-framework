/* eslint-disable no-param-reassign */
import { StaffServiceGetStaffIdsbyGroup } from "@jamalsoueidan/backend.services.staff";
import { AppControllerProps } from "@jamalsoueidan/backend.types.api";
import {
  BookingServiceCreateProps,
  BookingServiceGetAllProps,
  BookingServiceGetByIdProps,
  BookingServiceUpdateProps,
} from "@jamalsoueidan/backend.types.booking";

export const bookingGetAllApp = async ({
  query,
  session,
}: AppControllerProps<BookingServiceGetAllProps>) => {
  query.staff = await StaffServiceGetStaffIdsbyGroup({
    group: session.group,
    shop: session.shop,
  });
};

export const bookingGetByIdApp = async ({
  query,
  session,
}: AppControllerProps<BookingServiceGetByIdProps>) => {
  query.staff = await StaffServiceGetStaffIdsbyGroup({
    group: session.group,
    shop: session.shop,
  });
};

export const bookingCreateApp = async ({
  body,
  session,
}: AppControllerProps<never, BookingServiceCreateProps>) => {
  const { staff } = body;

  // user can only create for self self
  if (session.isUser) {
    if (staff !== session.staff) {
      throw { staff: "You can't create booking for another staff" };
    }
  } else if (session.isAdmin) {
    const allStaff = await StaffServiceGetStaffIdsbyGroup({
      group: session.group,
      shop: session.shop,
    });
    const notFound = !allStaff.find((s) => s === staff);
    if (notFound) {
      throw { staff: "You can't create booking in another group" };
    }
  }
};

export const bookingUpdateApp = async ({
  body,
  session,
}: AppControllerProps<
  BookingServiceUpdateProps["query"],
  BookingServiceUpdateProps["body"]
>) => {
  const { staff } = body;

  if (session.isUser) {
    if (body.staff !== session.staff) {
      throw { access: "not allowed" };
    }
  } else if (session.isAdmin) {
    const allStaff = await StaffServiceGetStaffIdsbyGroup({
      group: session.group,
      shop: session.shop,
    });
    const notFound = !allStaff.find((s) => s === staff);
    if (notFound) {
      throw { staff: "cant update booking in another group" };
    }
  }
};
