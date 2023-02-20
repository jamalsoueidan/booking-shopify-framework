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
    if (session.role > StaffRole.admin) {
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

  if (isExternalApplication(session)) {
    getById.staff = await StaffServiceGetStaffIdsbyGroup({
      shop: session.shop,
      group: session.group,
    });
  }

  return BookingServiceGetById(getById);
};

export const create = ({
  body,
  session,
}: ControllerProps<
  any,
  BookingServiceCreateProps,
  ShopifySession | AppSession
>) => {
  const { shop } = session;
  const { staff } = body;

  if (isExternalApplication(session) && session.role > StaffRole.admin) {
    if (staff !== session.staff) {
      throw { staff: "cant create booking for another staff" };
    }
  }

  return BookingServiceCreate({ ...body, staff, shop });
};

export const update = ({
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
  let { staff } = body;

  if (isExternalApplication(session)) {
    const booking = BookingModel.findOne({ _id, shop, staff: session.staff });
    if (!booking) {
      throw new Error("not allowed");
    }
  }

  return BookingServiceUpdate({ shop, _id }, { ...body, staff });
};
