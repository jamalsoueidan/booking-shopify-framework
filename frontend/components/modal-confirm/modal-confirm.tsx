import { Modal } from "@shopify/polaris";
import React, { useCallback, useMemo } from "react";

export interface ModalConfirmProps {
  active: boolean;
  setActive: (value: boolean) => void;
}

export const ModalConfirm = ({ active, setActive }: ModalConfirmProps) => {
  const primaryAction = useMemo(
    () => ({
      content: "Delete",
      onAction: () => setActive(true),
    }),
    [setActive],
  );

  const secondaryActions = useMemo(
    () => [
      {
        content: "Cancel",
        onAction: () => setActive(false),
      },
    ],
    [setActive],
  );

  const onClose = useCallback(() => setActive(false), [setActive]);

  return (
    <Modal
      small
      open={active}
      onClose={onClose}
      title="Remove product"
      primaryAction={primaryAction}
      secondaryActions={secondaryActions}
    >
      <Modal.Section>
        <p>
          All settings will be deleted, This action cant be undone. This will
          not remove the product from your store.
        </p>
      </Modal.Section>
    </Modal>
  );
};
