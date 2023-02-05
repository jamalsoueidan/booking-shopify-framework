import { withApplication } from "@jamalsoueidan/bsd.preview.with-application";
import { Modal } from "@shopify/polaris";
import React, { useContext, useEffect } from "react";
import { ModalContext } from "./modal-context";
import { ModalProvider } from "./modal-context-provider";

function MockComponent() {
  const { setPrimaryAction } = useContext(ModalContext);

  useEffect(() => {
    setPrimaryAction({
      content: "Tilføj",
      onAction: () => {
        // eslint-disable-next-line no-console
        console.log("nice");
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Modal.Section>MockComponent that read value from context</Modal.Section>;
}

export const BasicThemeUsage = withApplication(
  () => (
    <ModalProvider title="hej med dig" open onClose={() => {}}>
      <MockComponent />
    </ModalProvider>
  ),
  { pageTitle: "ModalProvider" },
);
