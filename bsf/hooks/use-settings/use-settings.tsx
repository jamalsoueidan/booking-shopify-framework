import { SettingsContext } from "@jamalsoueidan/bsf.providers.settings";
import { useContext } from "react";

export const useSettings = () => {
  return useContext(SettingsContext);
};
