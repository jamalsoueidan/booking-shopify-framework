import { StaffRole } from "@jamalsoueidan/backend.types.staff";
import { SaveBarProvider } from "@jamalsoueidan/frontend.providers.save-bar";
import {
  SettingsContextValues,
  SettingsProvider,
} from "@jamalsoueidan/frontend.providers.settings";
import { ToastProvider } from "@jamalsoueidan/frontend.providers.toast";
import { Frame, Inline, Page } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import { Field } from "@shopify/react-form";
import { I18nContext, I18nManager } from "@shopify/react-i18n";
import React from "react";
import { useNavigate } from "react-router";
import { Language, TimeZone, UserRole } from "./input-fields";
import { LinkComponent } from "./link-component";
import { AbilityPreview, PolarisProvider } from "./providers";

const i18nManager = new I18nManager({
  locale: "da",
});

const value: SettingsContextValues = {
  LinkComponent,
  language: "da",
  navigate: () => {},
  timeZone: "Europe/Copenhagen",
};

export interface PreviewProps {
  children?: React.ReactNode;
  hideControls: boolean;
}

export const Preview = ({ children, hideControls }: PreviewProps) => (
  <I18nContext.Provider value={i18nManager}>
    <PolarisProvider>
      <SettingsProvider value={{ ...value, navigate: useNavigate() }}>
        <AbilityPreview>
          {(field: Field<StaffRole>) => (
            <Frame>
              {!hideControls && (
                <Page fullWidth>
                  <Inline gap="4">
                    <TimeZone />
                    <Language />
                    <UserRole field={field} />
                  </Inline>
                </Page>
              )}
              <ToastProvider>
                <SaveBarProvider>{children}</SaveBarProvider>
              </ToastProvider>
            </Frame>
          )}
        </AbilityPreview>
      </SettingsProvider>
    </PolarisProvider>
  </I18nContext.Provider>
);
