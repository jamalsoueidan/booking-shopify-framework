import { SettingModel } from "@jamalsoueidan/bsb.services.setting";
import {
  WidgetServiceAvailability,
  WidgetServiceGetStaff,
} from "@jamalsoueidan/bsb.services.widget";
import { ControllerProps } from "@jamalsoueidan/bsb.types.api";
import {
  WidgetServiceAvailabilityProps,
  WidgetServiceGetStaffProps,
} from "@jamalsoueidan/bsb.types.widget";

export const widgetStaff = ({
  query,
}: ControllerProps<WidgetServiceGetStaffProps>) => WidgetServiceGetStaff(query);

export const widgetAvailability = ({
  query,
}: ControllerProps<WidgetServiceAvailabilityProps>) =>
  WidgetServiceAvailability(query);

export const widgetSettings = () =>
  SettingModel.findOne({}, "language status timeZone");
