import {
  ModalContext,
  ModalContextType,
} from "@jamalsoueidan/frontend.providers.modal";
import { useContext } from "react";

export const useModal = () => {
  const context = useContext<ModalContextType>(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};
