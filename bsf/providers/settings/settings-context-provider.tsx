import { AppProvider } from "@shopify/polaris";
import da from "@shopify/polaris/locales/da.json";
import en from "@shopify/polaris/locales/en.json";
import { I18nContext, I18nManager, useI18n } from "@shopify/react-i18n";
import React, { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { SettingsContext, SettingsContextValues } from "./settings-context";

export type SettingsProviderProps = {
  children: ReactNode;
  value: SettingsContextValues;
  linkComponent?: (props: any) => JSX.Element;
};

export const SettingsProvider = ({ children, value: defaultValue, linkComponent }: SettingsProviderProps) => {
  const [value, setValue] = useState<SettingsContextValues>(defaultValue);

  const manager = useMemo(
    () =>
      new I18nManager({
        locale: value?.language,
        onError: (details) => {
          // eslint-disable-next-line no-console
          console.log(details);
        },
      }),
    [value.language],
  );

  useEffect(() => {
    if (value.language) {
      manager.update({ locale: value.language });
    }
  }, [value.language, manager]);

  const update = useCallback((values: Partial<SettingsContextValues>) => {
    setValue((prev) => ({ ...prev, ...values }));
  }, []);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <SettingsContext.Provider value={{ ...value, update }}>
      <I18nContext.Provider value={manager}>
        <PolarisProvider linkComponent={linkComponent}>{children}</PolarisProvider>
      </I18nContext.Provider>
    </SettingsContext.Provider>
  );
};

interface PolarisProvider {
  children: ReactNode;
  linkComponent?: (props: any) => JSX.Element;
}

export const PolarisProvider = ({ children, ...props }: PolarisProvider) => {
  const [i18n] = useI18n({
    fallback: da,
    id: "Polaris",
    async translations(locale) {
      return locale === "en" ? en : da;
    },
  });
  return (
    <AppProvider i18n={i18n.locale === "da" ? i18n.translations[0] : i18n.translations[1]} {...props}>
      {children}
    </AppProvider>
  );
};
