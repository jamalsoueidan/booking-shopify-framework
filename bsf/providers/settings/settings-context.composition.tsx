import { Button, Page, Text } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import { useI18n } from "@shopify/react-i18n";
import React, { useCallback, useState } from "react";
import { SettingsProvider } from "./settings-context-provider";

const locales = {
  da: {
    lang: "Dansk",
    danish: "Dansk",
    english: "Engelsk",
  },
  en: {
    lang: "English",
    danish: "Danish",
    english: "English",
  },
};

const MockComponent = ({ setLanguage }) => {
  const [i18n] = useI18n({
    fallback: locales.da,
    id: "settings",
    translations: (locale: string) => (locale === "da" ? locales.da : locales.en),
  });

  return (
    <Page title="Example">
      {i18n.translate("lang")}
      <br />
      <Button onClick={() => setLanguage("da")}>{i18n.translate("danish")}</Button>
      <Button onClick={() => setLanguage("en")}>{i18n.translate("english")}</Button>
    </Page>
  );
};

export const Basic = () => {
  const [language, setLanguage] = useState<string>("da");

  return (
    <SettingsProvider value={{ language, timeZone: "Europe" }}>
      <MockComponent setLanguage={setLanguage} />
    </SettingsProvider>
  );
};

function AppBridgeLink({ url, children, external, ...rest }) {
  const handleClick = useCallback(() => {
    console.log(url);
  }, [url]);

  const IS_EXTERNAL_LINK_REGEX = /^(?:[a-z][a-z\d+.-]*:|\/\/)/;

  if (external || IS_EXTERNAL_LINK_REGEX.test(url)) {
    return (
      <a {...rest} href={url} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <a {...rest} onClick={handleClick}>
      {children}
    </a>
  );
}

export const LinkComponent = () => {
  const [language, setLanguage] = useState<string>("da");

  return (
    <SettingsProvider value={{ language, timeZone: "Europe" }} linkComponent={AppBridgeLink}>
      <Page title="LinkComponent">
        <Text variant="bodyLg" as="h1">
          Provide a linkComponent to settiingsProvider, so all polaris component use the linkComponent
        </Text>
        <Button url="test">Test (see console)</Button>
        <Button url="another-route">Route (see console)</Button>
      </Page>
    </SettingsProvider>
  );
};
