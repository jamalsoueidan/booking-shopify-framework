import { FeaturesConfig } from "@shopify/polaris/build/ts/latest/src/utilities/features";

export interface SettingsContextValues {
  timeZone: string;
  language: string;
  LinkComponent: React.ComponentType<LinkComponentProps>;
  navigate: Navigator;
  features?: FeaturesConfig;
}

export interface SettingsContextType extends SettingsContextValues {
  update: (value: Partial<SettingsContextValues>) => void;
}

export type Navigator = (to: string, options?: { replace?: boolean }) => void;

export interface LinkComponentProps extends React.HTMLProps<HTMLAnchorElement> {
  /** The url to link to */
  url: string;
  /**	The content to display inside the link */
  children?: React.ReactNode;
  /** Makes the link open in a new tab */
  external?: boolean;
  /** Makes the browser download the url instead of opening it. Provides a hint for the downloaded filename if it is a string value. */
  download?: string | boolean;
  [key: string]: unknown;
}
