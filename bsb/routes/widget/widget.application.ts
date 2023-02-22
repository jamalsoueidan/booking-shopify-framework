/* eslint-disable no-param-reassign */
import { AppControllerProps } from "@jamalsoueidan/bsb.types.api";
import {
  WidgetServiceAvailabilityProps,
  WidgetServiceGetStaffProps,
} from "@jamalsoueidan/bsb.types.widget";

export const widgetStaffApp = ({
  query,
  session,
}: AppControllerProps<WidgetServiceGetStaffProps, never>) => {
  if (session.isUser) {
    query.staff = session.staff;
    query.group = session.group;
  }
};

export const widgetAvailabiliyApp = ({
  query,
  session,
}: AppControllerProps<WidgetServiceAvailabilityProps>) => {
  if (session.isUser && query.staff !== session.staff) {
    throw { access: "You can't get availabilities for this staff" };
  }
};
