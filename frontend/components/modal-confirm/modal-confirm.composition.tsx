import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import React from "react";
import { ModalConfirm } from "./modal-confirm";

export const BasicModalConfirm = withApplication(() => (
  <ModalConfirm active setActive={() => {}} />
));
