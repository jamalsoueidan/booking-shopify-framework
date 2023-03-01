import { ComplexAction, ModalProps } from "@shopify/polaris";
import { createContext } from "react";

export interface ModalContextType extends Partial<ModalProps> {
  setPrimaryAction: (value: ComplexAction | undefined) => void;
  setSecondaryActions: (value: ComplexAction[] | undefined) => void;
}

export const ModalContext = createContext<ModalContextType>({
  setPrimaryAction(value) {},
  setSecondaryActions(value) {},
});
