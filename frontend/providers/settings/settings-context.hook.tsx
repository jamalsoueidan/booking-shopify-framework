import {
  SettingsContext,
  SettingsContextType,
} from "@jamalsoueidan/frontend.providers.settings";
import React, { useContext } from "react";

export const useSettings = () => {
  const context = useContext<SettingsContextType>(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }

  return context;
};

export const useNavigate = () => useSettings().useNavigate;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Link = ({ children, ...rest }: any) => {
  const { LinkComponent } = useSettings();

  if (LinkComponent) {
    return <LinkComponent {...rest}>{children}</LinkComponent>;
  }
  return <>{children}</>;
};
