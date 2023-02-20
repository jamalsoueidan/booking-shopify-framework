import { BookingServiceGetAll } from "@jamalsoueidan/bsb.services.booking";
import { StaffServiceGetStaffIdsbyGroup } from "@jamalsoueidan/bsb.services.staff";
import {
  AppSession,
  ControllerProps,
  isExternalApplication,
} from "@jamalsoueidan/bsb.types.api";
import { BookingServiceGetAllProps } from "@jamalsoueidan/bsb.types.booking";
import { ShopifySession } from "@jamalsoueidan/bsb.types.shopify-session";
import { StaffRole } from "@jamalsoueidan/bsb.types.staff";

export const BookingGetAll = async ({
  query,
  session,
}: ControllerProps<
  BookingServiceGetAllProps,
  null,
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
