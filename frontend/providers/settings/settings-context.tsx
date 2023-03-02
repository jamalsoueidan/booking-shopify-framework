import { FeaturesConfig } from "@shopify/polaris/build/ts/latest/src/utilities/features";
import { LinkLikeComponent } from "@shopify/polaris/build/ts/latest/src/utilities/link";
import { createContext } from "react";

export interface Navigator {
  (to: string, options?: { replace?: boolean }): void;
  (delta: number): void;
}

export type UseNavigate = () => Navigator;

export interface SettingsContextValues {
  timeZone: string;
  language: string;
  LinkComponent: LinkLikeComponent;
  useNavigate: UseNavigate;
  features?: FeaturesConfig;
}

export interface SettingsContextType extends SettingsContextValues {
  update: (value: Partial<SettingsContextValues>) => void;
}

export const defaultValues = {
  language: "da",
  timeZone: "Europe/Copenhagen",
  LinkComponent: () => {},
  useNavigate: () => {},
  update: () => {},
} as any;

export const SettingsContext =
  createContext<SettingsContextType>(defaultValues);
