import {
  SettingsContext,
  SettingsContextType,
} from "@jamalsoueidan/bsf.providers.settings";

import { useContext } from "react";

export const useSettings = () => {
  const context = useContext<SettingsContextType>(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }

  return context;
};
