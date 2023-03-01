import { AppControllerProps } from "@jamalsoueidan/backend.types.api";
import { StaffRole } from "@jamalsoueidan/backend.types.staff";

export const onlyAdmin = ({ session }: AppControllerProps) => {
  if (session.role > StaffRole.admin) {
    throw { access: "not allowed" };
  }
};

export const onlyOwner = ({ session }: AppControllerProps) => {
  if (session.role > StaffRole.owner) {
    throw { access: "not allowed" };
  }
};
