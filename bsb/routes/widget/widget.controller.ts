import {
  WidgetServiceAvailability,
  WidgetServiceGetStaff,
} from "@jamalsoueidan/bsb.services.widget";
import {
  AppSession,
  ControllerProps,
  isExternalApplication,
} from "@jamalsoueidan/bsb.types.api";
import { ShopifySession } from "@jamalsoueidan/bsb.types.shopify-session";
import {
  WidgetServiceAvailabilityProps,
  WidgetServiceGetStaffProps,
} from "@jamalsoueidan/bsb.types.widget";

export const widgetStaff = ({
  query,
  session,
}: ControllerProps<
  WidgetServiceGetStaffProps,
  never,
  ShopifySession | AppSession
>) => {
  const { productId, shop } = query;
  let staff;
  if (isExternalApplication(session) && session.isUser) {
    staff = session.staff;
  }

  return WidgetServiceGetStaff({
    productId,
    shop,
    staff,
  });
};

export const widgetAvailability = ({
  query,
  session,
}: ControllerProps<
  WidgetServiceAvailabilityProps,
  never,
  ShopifySession | AppSession
>) => {
  let { staff } = query;
  if (isExternalApplication(session)) {
    staff = session.staff;
  }

  return WidgetServiceAvailability({ ...query, staff });
};
