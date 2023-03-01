import { Staff } from "@jamalsoueidan/pkg.backend-types";
import { HelperArray } from "@jamalsoueidan/pkg.frontend";
import { Avatar, AvatarProps } from "@shopify/polaris";
import React, { useMemo } from "react";

export type StaffAvatarStackProps = {
  staff: Staff[];
  size: AvatarProps["size"];
};

export const StaffAvatarStack = ({ staff, size }: StaffAvatarStackProps) => {
  const staffMarkup = useMemo(
    () =>
      [...staff]
        .sort(HelperArray.sortByText((d) => d.fullname))
        .map((staff) => (
          <Avatar
            key={staff._id}
            customer
            size={size}
            name={staff.fullname}
            source={staff.avatar}
          />
        )),
    [size, staff],
  );

  return <>{staffMarkup}</>;
};