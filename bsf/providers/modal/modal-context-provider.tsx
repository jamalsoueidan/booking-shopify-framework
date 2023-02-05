import { ComplexAction, Modal, ModalProps } from "@shopify/polaris";
import React, { useMemo, useState } from "react";
import { ModalContext } from "./modal-context";

export type ModalProviderProps = ModalProps;

export const ModalProvider = (props: ModalProviderProps) => {
  const [primaryAction, setPrimaryAction] = useState<ComplexAction | undefined>();
  const [secondaryActions, setSecondaryActions] = useState<ComplexAction[] | undefined>();

  const value = useMemo(
    () => ({
      ...props,
      setPrimaryAction,
      setSecondaryActions,
    }),
    [props, setPrimaryAction, setSecondaryActions],
  );

  return (
    <ModalContext.Provider value={value}>
      <Modal large primaryAction={primaryAction} secondaryActions={secondaryActions} {...props}>
        {props.children}
      </Modal>
    </ModalContext.Provider>
  );
};
