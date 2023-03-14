import { createContext } from "react";
import { LinkComponent } from "./settings-context.helper";
import { SettingsContextType } from "./settings-context.types";

export const defaultValues = {
  LinkComponent,
  language: "da",
  navigate: () => {},
  timeZone: "Europe/Copenhagen",
  update: () => {},
};

export const SettingsContext =
  createContext<SettingsContextType>(defaultValues);
