import { SaveBarProvider } from "@jamalsoueidan/bsf.providers.save-bar";
import { SettingsProvider } from "@jamalsoueidan/bsf.providers.settings";
import { ToastProvider } from "@jamalsoueidan/bsf.providers.toast";
import { AppProvider, Frame, Icon, Page, Text, TopBar } from "@shopify/polaris";
import { LanguageMinor } from "@shopify/polaris-icons";
import "@shopify/polaris/build/esm/styles.css";
import da from "@shopify/polaris/locales/da.json";
import en from "@shopify/polaris/locales/en.json";
import { I18nContext, I18nDetails, I18nManager, useI18n } from "@shopify/react-i18n";
import { setDefaultOptions } from "date-fns";
import { da as daDateFns } from "date-fns/locale";
import React, { ReactNode, useCallback, useContext, useEffect, useState } from "react";

const i18nManager = new I18nManager({
  locale: "da",
});

export interface ApplicationProps {
  children?: React.ReactNode;
}

export const Application = ({ children }: ApplicationProps) => {
  setDefaultOptions({ locale: daDateFns });
  return (
    <I18nContext.Provider value={i18nManager}>
      <PolarisProvider>{children}</PolarisProvider>
    </I18nContext.Provider>
  );
};

export interface ApplicationFrameProps {
  children?: React.ReactNode;
}

export const ApplicationFrame = ({ children }: ApplicationFrameProps) => (
  <Application>
    <SettingsProvider value={{ language: "en", timeZone: "Europe/Copenhagen" }}>
      <Frame>
        <ToastProvider>
          <SaveBarProvider>{children}</SaveBarProvider>
        </ToastProvider>
      </Frame>
    </SettingsProvider>
  </Application>
);

export interface ApplicationFramePageProps extends ApplicationProps {
  title?: string;
}

export const ApplicationFramePage = ({ children, title }: ApplicationFramePageProps) => {
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
    <AppProvider i18n={i18n.locale === "da" ? i18n.translations[0] : i18n.translations[1]}>{children}</AppProvider>
  );
};

const FrameChangeLanguage = ({ children }) => {
  const i18n = useContext<I18nManager | null>(I18nContext);
  const [value, setValue] = useState<string>();

  i18n?.subscribe(["locale"], (_, b: I18nDetails) => {
    setValue(b.locale);
  });

  useEffect(() => {
    setValue(i18n?.details?.locale || "da");
  }, [i18n?.details?.locale]);

  const onChange = useCallback(
    (locale: string) => {
      i18n?.update({ locale });
    },
    [i18n],
  );

  const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);

  const toggleIsSecondaryMenuOpen = useCallback(
    () => setIsSecondaryMenuOpen((isSecondaryMenuOpen) => !isSecondaryMenuOpen),
    [],
  );

  setDefaultOptions({ locale: value === "da" ? daDateFns : undefined });

  const secondaryMenuMarkup = (
    <TopBar.Menu
      activatorContent={
        <span>
          <Icon source={LanguageMinor} />
          <Text variant="bodySm" as="span" visuallyHidden>
            Change Language
          </Text>
        </span>
      }
      open={isSecondaryMenuOpen}
      onOpen={toggleIsSecondaryMenuOpen}
      onClose={toggleIsSecondaryMenuOpen}
      actions={[
        {
          items: [
            {
              content: "Dansk",
              onAction: () => {
                onChange("da");
              },
            },
            {
              content: "English",
              onAction: () => {
                onChange("en");
              },
            },
          ],
        },
      ]}
    />
  );

  const topBarMarkup = <TopBar showNavigationToggle secondaryMenu={secondaryMenuMarkup} />;

  return (
    <SettingsProvider value={{ language: value || "da", timeZone: "Europe/Copenhagen" }}>
      <Frame topBar={topBarMarkup}>
        <ToastProvider>
          <SaveBarProvider>{children}</SaveBarProvider>
        </ToastProvider>
      </Frame>
    </SettingsProvider>
  );
};
