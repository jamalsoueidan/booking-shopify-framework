import { StaffRole } from "@jamalsoueidan/backend.types.staff";
import { SaveBarProvider } from "@jamalsoueidan/frontend.providers.save-bar";
import {
  SettingsContextValues,
  SettingsProvider,
} from "@jamalsoueidan/frontend.providers.settings";
import { ToastProvider } from "@jamalsoueidan/frontend.providers.toast";
import { Frame, Icon, Inline, Page, Text } from "@shopify/polaris";
import { AnalyticsMajor } from "@shopify/polaris-icons";
import { Field } from "@shopify/react-form";
import { I18nContext, I18nManager } from "@shopify/react-i18n";
import React from "react";
import { useNavigate } from "react-router-dom";
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
  isLive?: boolean;
}

export const Preview = ({ children, hideControls, isLive }: PreviewProps) => {
  const navigate = useNavigate();

  return (
    <I18nContext.Provider value={i18nManager}>
      <PolarisProvider>
        <SettingsProvider value={{ ...value, navigate }}>
          <AbilityPreview>
            {(field: Field<StaffRole>) => (
              <Frame>
                {!hideControls && (
                  <Page fullWidth>
                    <Inline gap="4" blockAlign="center">
                      {isLive && (
                        <Inline gap="1" blockAlign="center">
                          <Icon source={AnalyticsMajor} color="primary" />
                          <Text variant="bodyMd" as="span" color="success">
                            Online
                          </Text>
                        </Inline>
                      )}
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
};
