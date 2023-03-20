import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import { Button } from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import { ModalConfirm } from "./modal-confirm";

export const BasicModalConfirm = withApplication(() => {
  const [active, setActive] = useState<boolean>(true);

  const toggle = useCallback(() => {
    setActive((value) => !value);
  }, []);

  return (
    <>
      <Button destructive onClick={toggle}>
        Delete
      </Button>
      <ModalConfirm show={active} close={toggle} />
    </>
  );
});
