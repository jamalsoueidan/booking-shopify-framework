import { createContext } from "react";
import { ToastProps } from "@shopify/polaris";

export interface ToastContextProps {
  show: (value: Partial<ToastProps>) => void;
}

export const ToastContext = createContext<ToastContextProps | undefined>(
  undefined
);
