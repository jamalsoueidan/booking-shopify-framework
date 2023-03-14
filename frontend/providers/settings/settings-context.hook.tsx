import React, { useContext } from "react";
import { SettingsContext } from "./settings-context";
import {
  LinkComponentProps,
  SettingsContextType,
} from "./settings-context.types";

export const useSettings = () => {
  const context = useContext<SettingsContextType>(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }

  return context;
};

export const useNavigate = () => {
  if (typeof window === "undefined")
    throw new Error("cannot use native navigator outside of browser. ");

  return useSettings().navigate;
};

export const Link = ({ children, ...rest }: LinkComponentProps) => {
  const { LinkComponent } = useSettings();

  if (LinkComponent) {
    return <LinkComponent {...rest}>{children}</LinkComponent>;
  }
  return <>{children}</>;
};
