import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import { AlphaCard, Avatar, Box, Button, Text } from "@shopify/polaris";
import React from "react";
import { StaffResourceItem } from "./staff-resource-item";

export const Basic = withApplication(() => (
  <AlphaCard padding="0">
    <Box padding="4">
      <Text as="h1" variant="bodyLg">
        StaffResourceItem
      </Text>
    </Box>
    <StaffResourceItem title="Title" desc="Desc" media={<Avatar customer />} />
  </AlphaCard>
));

export const BasicWithAction = withApplication(() => (
  <AlphaCard padding="0">
    <Box padding="4">
      <Text as="h1" variant="bodyLg">
        StaffResourceItem
      </Text>
    </Box>
    <StaffResourceItem
      title="Title"
      desc="Desc"
      media={<Avatar customer />}
      action={<Button>iojad</Button>}
    />
  </AlphaCard>
));
