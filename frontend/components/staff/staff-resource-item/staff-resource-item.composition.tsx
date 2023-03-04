import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import { Avatar } from "@shopify/polaris";
import React from "react";
import { StaffResourceItem } from "./staff-resource-item";

export const BasicStaffResourceItem = withApplication(() => (
  <StaffResourceItem title="Title" desc="Desc" media={<Avatar customer />} />
));
