import {
  BookingModel,
  BookingServiceCreate,
  BookingServiceGetAll,
  BookingServiceGetById,
  BookingServiceUpdate,
} from "@jamalsoueidan/bsb.services.booking";
import { StaffServiceGetStaffIdsbyGroup } from "@jamalsoueidan/bsb.services.staff";
import {
  AppSession,
  ControllerProps,
  isExternalApplication,
} from "@jamalsoueidan/bsb.types.api";
import {
  BookingServiceCreateProps,
  BookingServiceGetAllProps,
  BookingServiceGetByIdProps,
  BookingServiceUpdateProps,
} from "@jamalsoueidan/bsb.types.booking";
import { ShopifySession } from "@jamalsoueidan/bsb.types.shopify-session";
import { StaffRole } from "@jamalsoueidan/bsb.types.staff";

export const getAll = async ({
  query,
  session,
}: ControllerProps<
  BookingServiceGetAllProps,
  never,
  ShopifySession | AppSession
>) => {
  const getAll = query;
  if (isExternalApplication(session)) {
    if (session.role > StaffRole.owner) {
      getAll.staff = await StaffServiceGetStaffIdsbyGroup({
        group: session.group,
        shop: session.shop,
      });
    }
  }
  return BookingServiceGetAll(getAll);
};

export const getById = async ({
  query,
  session,
}: ControllerProps<
  BookingServiceGetByIdProps,
  never,
  ShopifySession | AppSession
>) => {
  const getById: Parameters<typeof BookingServiceGetById>[0] = {
    _id: query._id,
    shop: session.shop,
  };

  if (isExternalApplication(session) && session.role > StaffRole.owner) {
    getById.staff = await StaffServiceGetStaffIdsbyGroup({
      group: session.group,
      shop: session.shop,
    });
  }

  const booking = await BookingServiceGetById(getById);
  if (!booking) {
    throw `You dont have access to this booking id: ${query._id}`;
  }
  return booking;
};

export const create = async ({
  body,
  session,
}: ControllerProps<
  never,
  BookingServiceCreateProps,
  ShopifySession | AppSession
>) => {
  const { shop } = session;
  const { staff } = body;

  if (isExternalApplication(session)) {
    // user can only create for self self
    if (session.isUser) {
      if (staff !== session.staff) {
        throw { staff: "cant create booking for another staff" };
      }
    } else if (session.isAdmin) {
      const allStaff = await StaffServiceGetStaffIdsbyGroup({
        group: session.group,
        shop: session.shop,
      });
      const notFound = !allStaff.find((s) => s === staff);
      if (notFound) {
        throw { staff: "cant create booking in another group" };
      }
    }
  }

  return BookingServiceCreate({ ...body, shop, staff });
};

export const update = async ({
  query,
  body,
  session,
}: ControllerProps<
  BookingServiceUpdateProps["query"],
  BookingServiceUpdateProps["body"],
  ShopifySession | AppSession
>) => {
  const { _id } = query;
  const { shop } = session;
  const { staff } = body;

  if (isExternalApplication(session)) {
    if (session.isUser) {
      const booking = await BookingModel.findOne({
        _id,
        shop,
        staff: session.staff,
      });
      if (!booking) {
        throw new Error("not allowed");
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
  }

  return BookingServiceUpdate({ _id, shop }, { ...body, staff });
};
