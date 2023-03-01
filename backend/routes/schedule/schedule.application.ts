import { StaffModel } from "@jamalsoueidan/backend.services.staff";
import { AppControllerProps } from "@jamalsoueidan/backend.types.api";
import {
  ScheduleServiceCreateProps,
  ScheduleServiceGetAllProps,
} from "@jamalsoueidan/backend.types.schedule";
import { StaffRole } from "@jamalsoueidan/backend.types.staff";

export const scheduleGetAllApp = async ({
  query,
  session,
}: AppControllerProps<ScheduleServiceGetAllProps>) => {
  const { staff: id } = query;

  const staff = await StaffModel.findById(id, "group");
  if (staff?.group !== session.group) {
    throw { access: "not allowed to modifiy staff in other groups" };
  }
};

export const scheduleCreateOrUpdateApp = async ({
  query,
  session,
}: AppControllerProps<ScheduleServiceCreateProps["query"]>) => {
  if (session.role >= StaffRole.user && query.staff !== session.staff) {
    throw { access: "not allowed to modifiy other staff" };
  }

  const staff = await StaffModel.findById(query.staff, "group");
  if (staff?.group !== session.group) {
    throw { access: "not allowed to modifiy staff in other groups" };
  }
};
