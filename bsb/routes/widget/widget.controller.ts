import { SettingModel } from "@jamalsoueidan/bsb.services.setting";
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
  let group;
  if (isExternalApplication(session) && session.isUser) {
    staff = session.staff;
    group = session.group;
  }

  return WidgetServiceGetStaff({
    group,
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
  if (
    isExternalApplication(session) &&
    session.isUser &&
    query.staff !== session.staff
  ) {
    throw "Error: You can't get availabilities for this staff";
  }

  return WidgetServiceAvailability(query);
};

export const widgetSettings = () =>
  SettingModel.findOne({}, "language status timeZone");
