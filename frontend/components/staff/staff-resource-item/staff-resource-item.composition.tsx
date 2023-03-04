import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import { Avatar, Card } from "@shopify/polaris";
import React from "react";
import { StaffResourceItem } from "./staff-resource-item";

export const BasicStaffResourceItem = withApplication(() => (
  <Card title="StaffResourceItem">
    <StaffResourceItem title="Title" desc="Desc" media={<Avatar customer />} />
  </Card>
));
