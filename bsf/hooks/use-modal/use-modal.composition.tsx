import { withApplication } from "@jamalsoueidan/bsd.preview.with-application";
import { ModalProvider } from "@jamalsoueidan/bsf.providers.modal";
import { Modal } from "@shopify/polaris";
import React, { useEffect } from "react";
import { useModal } from "./use-modal";

function MockComponent() {
  const { setPrimaryAction } = useModal();

  useEffect(() => {
    setPrimaryAction({
      content: "Tilføj",
      onAction: () => {
        // eslint-disable-next-line no-console
        console.log("Add");
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal.Section>MockComponent that read value from context</Modal.Section>
  );
}

export const BasicThemeUsage = withApplication(
  () => (
    <ModalProvider title="hej med dig" open onClose={() => {}}>
      <MockComponent />
    </ModalProvider>
  ),
  { pageTitle: "ModalProvider" },
);
