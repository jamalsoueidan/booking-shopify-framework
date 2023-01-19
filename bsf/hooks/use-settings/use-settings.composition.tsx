import {
  SettingsContext,
  SettingsProvider,
} from "@jamalsoueidan/bsf.providers.settings";
import { Button } from "@shopify/polaris";
import { useI18n } from "@shopify/react-i18n";
import React from "react";
import { useContext } from "react";

const locales = {
  da: {
    lang: "Dansk",
  },
  en: {
    lang: "English",
  },
};

const MockComponent = () => {
  const { language, update } = useContext(SettingsContext);
  const [i18n] = useI18n({
    id: "settings",
    fallback: locales.da,
    translations: (locale: string) =>
      locale === "da" ? locales.da : locales.en,
  });

  return (
    <div>
      {language}
      <br />
      <Button onClick={() => update({ language: "da" })}>Danish</Button>
      <Button onClick={() => update({ language: "en" })}>Engelsk</Button>
    </div>
  );
};

export const BasicuseSettings = () => {
  return (
    <SettingsProvider value={{ language: "da", timeZone: "europe" }}>
      <MockComponent />
    </SettingsProvider>
  );
};
