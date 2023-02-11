import { FeaturesConfig } from "@shopify/polaris/build/ts/latest/src/utilities/features";
import { createContext } from "react";

export interface SettingsContextValues {
  timeZone: string;
  language: string;
  features?: FeaturesConfig;
}

export interface SettingsContextType extends SettingsContextValues {
  update: (value: Partial<SettingsContextValues>) => void;
}

export const defaultValues = {
  language: "da",
  timeZone: "Europe/Copenhagen",
  update: () => {},
};

export const SettingsContext =
  createContext<SettingsContextType>(defaultValues);
