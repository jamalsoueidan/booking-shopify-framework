import { AppControllerProps } from "@jamalsoueidan/bsb.types.api";
import { StaffRole } from "@jamalsoueidan/bsb.types.staff";

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
