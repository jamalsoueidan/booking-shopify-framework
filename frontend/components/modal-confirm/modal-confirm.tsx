import { Modal } from "@shopify/polaris";
import React, { useCallback, useMemo } from "react";

export interface ModalConfirmProps {
  show: boolean;
  close: (value: boolean) => void;
}

export const ModalConfirm = ({ show, close }: ModalConfirmProps) => {
  const primaryAction = useMemo(
    () => ({
      content: "Delete",
      onAction: () => close(true),
    }),
    [close],
  );

  const secondaryActions = useMemo(
    () => [
      {
        content: "Cancel",
        onAction: () => close(false),
      },
    ],
    [close],
  );

  const onClose = useCallback(() => close(false), [close]);

  return (
    <Modal
      small
      open={show}
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
