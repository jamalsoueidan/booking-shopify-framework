import { AppProvider, Frame } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import da from "@shopify/polaris/locales/da.json";
import en from "@shopify/polaris/locales/en.json";
import { I18nContext, I18nManager, useI18n } from "@shopify/react-i18n";
import React from "react";

const i18nManager = new I18nManager({
  locale: "da",
});

export interface PreviewI18nProps {
  children?: React.ReactNode;
}

export const PreviewI18n = ({ children }: PreviewI18nProps) => {
  return (
    <I18nContext.Provider value={i18nManager}>
      <PolarisProvider>
        <Frame>{children}</Frame>
      </PolarisProvider>
    </I18nContext.Provider>
  );
};

const PolarisProvider = ({ children }: any) => {
  const [i18n] = useI18n({
    id: "Polaris",
    fallback: en,
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
