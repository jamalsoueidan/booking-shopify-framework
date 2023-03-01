import { SettingModel } from "@jamalsoueidan/backend.services.setting";
import {
  WidgetServiceAvailability,
  WidgetServiceGetStaff,
} from "@jamalsoueidan/backend.services.widget";
import { ControllerProps } from "@jamalsoueidan/backend.types.api";
import {
  WidgetServiceAvailabilityProps,
  WidgetServiceGetStaffProps,
} from "@jamalsoueidan/backend.types.widget";

export const widgetStaff = ({
  query,
}: ControllerProps<WidgetServiceGetStaffProps>) => WidgetServiceGetStaff(query);

export const widgetAvailability = ({
  query,
}: ControllerProps<WidgetServiceAvailabilityProps>) =>
  WidgetServiceAvailability(query);

export const widgetSettings = () =>
  SettingModel.findOne({}, "language status timeZone");
