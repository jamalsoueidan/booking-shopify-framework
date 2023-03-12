import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import { AlphaCard, Box, Text } from "@shopify/polaris";
import React, { useCallback } from "react";
import { StaffResourceList } from "./staff-resource-list";

export const Basic = withApplication(() => {
  const renderItem = useCallback((item: number) => {
    if (item === 1) {
      return {
        desc: "front-end",
        title: "jamal",
      };
    }
    if (item === 2) {
      return {
        desc: "enginner",
        title: "thomas",
      };
    }
    return {
      desc: "teamlead",
      title: "mikkel",
    };
  }, []);
  return (
    <AlphaCard padding="0">
      <Box padding="4">
        <Text as="h1" variant="bodyLg">
          Staff Resource List
        </Text>
      </Box>
      <StaffResourceList items={[1, 2, 3]} renderItem={renderItem} />
    </AlphaCard>
  );
});
