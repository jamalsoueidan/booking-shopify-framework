import { useCollectionCreate } from "@jamalsoueidan/frontend.state.collection";
import { ResourcePicker } from "@shopify/app-bridge-react";
import { SelectPayload } from "@shopify/app-bridge/actions/ResourcePicker";
import React, { useCallback } from "react";

export type CollectionResourcePickerProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const CollectionResourcePicker = ({
  open,
  setOpen,
}: CollectionResourcePickerProps) => {
  const { create } = useCollectionCreate();

  const handleSelection = useCallback(
    (resources: SelectPayload) => {
      const selections = resources.selection.map((s) => s.id);
      create({ selections });
      setOpen(false);
    },
    [create, setOpen],
  );

  const onCancel = useCallback(() => setOpen(false), [setOpen]);

  return (
    <ResourcePicker
      resourceType="Collection"
      open={open}
      onSelection={handleSelection}
      onCancel={onCancel}
    />
  );
};
