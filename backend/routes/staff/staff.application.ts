/* eslint-disable no-param-reassign */
import { AppControllerProps } from "@jamalsoueidan/backend.types.api";
import {
  StaffBodyCreate,
  StaffBodyUpdate,
  StaffRole,
  StaffServiceGetAllProps,
  StaffServiceGetStaffByIdQuery,
} from "@jamalsoueidan/backend.types.staff";

export const staffGetAllApp = ({
  query,
  session,
}: AppControllerProps<StaffServiceGetAllProps>) => {
  query.group = session.group;
};

export const staffCreateApp = ({
  body,
  session,
}: AppControllerProps<never, Partial<StaffBodyCreate>>) => {
  if (body.group !== session.group) {
    throw { access: "not allowed to create user in another group" };
  }
  // can only create user role staff
  body.role = StaffRole.user;
};

export const staffGetByIdApp = ({
  query,
  session,
}: AppControllerProps<StaffServiceGetStaffByIdQuery>) => {
  query.group = session.group;
};

export const staffUpdateApp = ({
  body,
  session,
}: AppControllerProps<never, StaffBodyUpdate>) => {
  if (body.group !== session.group) {
    throw { access: "not allowed to move user in another group" };
  }

  // can only create user role staff
  body.role = StaffRole.user;
};
