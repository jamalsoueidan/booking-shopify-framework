import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import React, { useCallback } from "react";
import { StaffResourceList } from "./staff-resource-list";

export const BasicStaffResourceList = withApplication(() => {
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
  return <StaffResourceList items={[1, 2, 3]} renderItem={renderItem} />;
});
