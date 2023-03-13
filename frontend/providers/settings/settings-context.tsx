import { FeaturesConfig } from "@shopify/polaris/build/ts/latest/src/utilities/features";
import { LinkLikeComponent } from "@shopify/polaris/build/ts/latest/src/utilities/link";
import { createContext } from "react";
import { LinkComponent } from "./settings-context.helper";

export interface Navigator {
  (to: string, options?: { replace?: boolean }): void;
  (delta: number): void;
}

export interface SettingsContextValues {
  timeZone: string;
  language: string;
  LinkComponent: LinkLikeComponent;
  navigate: Navigator;
  features?: FeaturesConfig;
}

export interface SettingsContextType extends SettingsContextValues {
  update: (value: Partial<SettingsContextValues>) => void;
}

export const defaultValues = {
  LinkComponent,
  language: "da",
  timeZone: "Europe/Copenhagen",
  update: () => {},
  navigate: () => {},
};

export const SettingsContext =
  createContext<SettingsContextType>(defaultValues);
