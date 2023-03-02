import { Button, Page, Text } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import { useI18n } from "@shopify/react-i18n";
import React, { useState } from "react";
import { SettingsProvider } from "./settings-context-provider";
import { LinkComponent } from "./settings-context.helper";

const value = {
  timeZone: "Europe",
  LinkComponent,
  useNavigate: () => {},
} as any;

const locales = {
  da: {
    danish: "Dansk",
    english: "Engelsk",
    lang: "Dansk",
  },
  en: {
    danish: "Danish",
    english: "English",
    lang: "English",
  },
};

interface MockComponentProps {
  setLanguage: (value: string) => void;
}

const MockComponent = ({ setLanguage }: MockComponentProps) => {
  const [i18n] = useI18n({
    fallback: locales.da,
    id: "settings",
    translations: (locale: string) =>
      locale === "da" ? locales.da : locales.en,
  });

  return (
    <Page title="Example">
      {i18n.translate("lang")}
      <br />
      <Button onClick={() => setLanguage("da")}>
        {i18n.translate("danish")}
      </Button>
      <Button onClick={() => setLanguage("en")}>
        {i18n.translate("english")}
      </Button>
    </Page>
  );
};

export const Basic = () => {
  const [language, setLanguage] = useState<string>("da");

  return (
    <SettingsProvider value={{ ...value, language }}>
      <MockComponent setLanguage={setLanguage} />
    </SettingsProvider>
  );
};

export const WithLinkComponent = () => {
  const [language] = useState<string>("da");

  return (
    <SettingsProvider value={{ ...value, language }}>
      <Page title="LinkComponent">
        <Text variant="bodyLg" as="h1">
          Provide a linkComponent to settiingsProvider, so all polaris component
          use the linkComponent
        </Text>
        <Button url="test">Test (see console)</Button>
        <Button url="another-route">Route (see console)</Button>
      </Page>
    </SettingsProvider>
  );
};
