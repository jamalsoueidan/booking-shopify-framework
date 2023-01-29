import { FeaturesConfig } from "@shopify/polaris/build/ts/latest/src/utilities/features";
import { createContext } from "react";

export interface SettingsContextValues {
  timeZone: string;
  language: string;
  features?: FeaturesConfig;
  [key: string]: unknown;
}

export interface SettingsContextType extends SettingsContextValues {
  update: (value: Partial<SettingsContextValues>) => void;
}

export const SettingsContext = createContext<SettingsContextType>({
  language: "da",
  timeZone: "europe/copenhagen",
} as SettingsContextType);
