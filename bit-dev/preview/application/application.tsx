import { InputLanguage } from "@jamalsoueidan/frontend.components.inputs.input-language";
import { InputTimeZone } from "@jamalsoueidan/frontend.components.inputs.input-time-zone";
import { SaveBarProvider } from "@jamalsoueidan/frontend.providers.save-bar";
import {
  SettingsProvider,
  useSettings,
} from "@jamalsoueidan/frontend.providers.settings";

import { ToastProvider } from "@jamalsoueidan/frontend.providers.toast";
import { AppProvider, Frame, Page, Stack } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import da from "@shopify/polaris/locales/da.json";
import en from "@shopify/polaris/locales/en.json";
import { useField } from "@shopify/react-form";
import { I18nContext, I18nManager, useI18n } from "@shopify/react-i18n";
import React, { ReactNode, useEffect } from "react";

const i18nManager = new I18nManager({
  locale: "da",
});

export interface ApplicationProps {
  children?: React.ReactNode;
}

export const Application = ({ children }: ApplicationProps) => (
  <I18nContext.Provider value={i18nManager}>
    <PolarisProvider>{children}</PolarisProvider>
  </I18nContext.Provider>
);

export interface ApplicationFrameProps {
  children?: React.ReactNode;
}

export const ApplicationFrame = ({ children }: ApplicationFrameProps) => (
  <SettingsProvider>
    <Frame>
      <ToastProvider>
        <SaveBarProvider>{children}</SaveBarProvider>
      </ToastProvider>
    </Frame>
  </SettingsProvider>
);

export interface ApplicationFramePageProps extends ApplicationProps {
  title?: string;
}

export const ApplicationFramePage = ({
  children,
  title,
}: ApplicationFramePageProps) => {
  const h = window.location.href;
  const isOnProfile = h.endsWith("compositions&");
  const isOnOverview = h.includes("viewport");
  const isOnDoc = h.includes("=overview");
  return isOnProfile || isOnOverview || isOnDoc ? (
    <ApplicationFrame>
      <Page fullWidth title={title || ""}>
        {children}
      </Page>
    </ApplicationFrame>
  ) : (
    <Application>
      <FrameChangeLanguage>
        <Page fullWidth title={title || ""}>
          {children}
        </Page>
      </FrameChangeLanguage>
    </Application>
  );
};

const PolarisProvider = ({ children }: { children: ReactNode }) => {
  const [i18n] = useI18n({
    fallback: en,
    id: "Polaris",
    async translations(locale) {
      return locale === "en-US" ? en : da;
    },
  });

  return (
    <AppProvider
      i18n={i18n.locale === "da" ? i18n.translations[0] : i18n.translations[1]}
    >
      {children}
    </AppProvider>
  );
};

interface FrameChangeLanguageProps {
  children: ReactNode;
}

const FrameChangeLanguage = ({ children }: FrameChangeLanguageProps) => (
  <SettingsProvider>
    <Frame>
      <Page fullWidth>
        <Stack>
          <TimeZone />
          <Language />
        </Stack>
      </Page>
      <ToastProvider>
        <SaveBarProvider>{children}</SaveBarProvider>
      </ToastProvider>
    </Frame>
  </SettingsProvider>
);

const TimeZone = () => {
  const { update, timeZone } = useSettings();
  const field = useField(timeZone);

  useEffect(() => {
    update({ timeZone: field.value });
  }, [update, field.value]);

  return <InputTimeZone {...field} />;
};

const Language = () => {
  const { language, update } = useSettings();
  const field = useField(language);

  useEffect(() => {
    update({ language: field.value });
  }, [update, field.value]);

  return <InputLanguage {...field} />;
};
