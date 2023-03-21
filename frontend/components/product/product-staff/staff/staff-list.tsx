import { ProductServiceUpdateBodyStaffProperty } from "@jamalsoueidan/backend.types.product";
import { ProductStaffEmpty } from "@jamalsoueidan/frontend.components.product.product-staff-empty";
import { StaffResourceList } from "@jamalsoueidan/frontend.components.staff.staff-resource-list";
import { HelperArray } from "@jamalsoueidan/frontend.helpers.helper-array";
import { usePosition } from "@jamalsoueidan/frontend.hooks.use-position";
import { useTag } from "@jamalsoueidan/frontend.hooks.use-tag";
import { AlphaCard, Avatar } from "@shopify/polaris";
import React, { useCallback, useContext, useMemo } from "react";
import { FormContext } from "./form-context";
import { StaffListHeader } from "./staff-list-header";

export interface StaffListProps {
  action: () => void;
}

export const StaffList = ({ action }: StaffListProps) => {
  const { selectTagLabel } = useTag();
  const { selectPosition } = usePosition();
  const { staffField } = useContext(FormContext);

  const renderItem = useCallback(
    ({
      fullname,
      avatar,
      position,
      tag,
    }: ProductServiceUpdateBodyStaffProperty) => ({
      desc: selectTagLabel(tag),
      media: <Avatar customer size="medium" name={fullname} source={avatar} />,
      title: `${fullname}, ${selectPosition(position || "1")}`,
    }),
    [selectPosition, selectTagLabel],
  );

  const items = useMemo(
    () =>
      [...staffField.value].sort(
        HelperArray.sortByText((d) => d.fullname || ""),
      ),
    [staffField],
  );

  return (
    <AlphaCard padding="0">
      <StaffListHeader itemsLength={items.length} action={action} />
      <StaffResourceList
        emptyState={<ProductStaffEmpty action={action} />}
        items={items}
        renderItem={renderItem}
      />
    </AlphaCard>
  );
};
