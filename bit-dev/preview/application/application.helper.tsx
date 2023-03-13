import { StaffRole } from "@jamalsoueidan/backend.types.staff";
import { InputLanguage } from "@jamalsoueidan/frontend.components.inputs.input-language";
import { InputTimeZone } from "@jamalsoueidan/frontend.components.inputs.input-time-zone";
import {
  AbilityProvider,
  defineAbilityFor,
} from "@jamalsoueidan/frontend.providers.ability";
import { SaveBarProvider } from "@jamalsoueidan/frontend.providers.save-bar";
import {
  SettingsContextValues,
  SettingsProvider,
  useSettings,
} from "@jamalsoueidan/frontend.providers.settings";
import { ToastProvider } from "@jamalsoueidan/frontend.providers.toast";

import { AppProvider, Frame, Inline, Page, Select } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import da from "@shopify/polaris/locales/da.json";
import en from "@shopify/polaris/locales/en.json";
import { Field, useField } from "@shopify/react-form";
import { I18nContext, I18nManager, useI18n } from "@shopify/react-i18n";
import React, { ReactNode, useCallback, useEffect, useMemo } from "react";

const i18nManager = new I18nManager({
  locale: "da",
});

const navigate = (to: any, options?: any) => {
  return console.log(to);
};

export function LinkComponent({ url, children, external, ...rest }: any) {
  const handleClick = useCallback(() => {
    console.log("link");
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <a {...rest} onClick={handleClick} role="alert">
      {children}
    </a>
  );
}

const value: SettingsContextValues = {
  LinkComponent,
  language: "da",
  timeZone: "Europe/Copenhagen",
  navigate,
};

export interface ApplicationProps {
  children?: React.ReactNode;
  hideControls: boolean;
}

export const ApplicationWrapper = ({
  children,
  hideControls,
}: ApplicationProps) => (
  <I18nContext.Provider value={i18nManager}>
    <PolarisProvider>
      <SettingsProvider value={value}>
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

export const PolarisProvider = ({ children }: { children: ReactNode }) => {
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

export const TimeZone = () => {
  const { update, timeZone } = useSettings();
  const field = useField(timeZone);

  useEffect(() => {
    update({ timeZone: field.value });
  }, [update, field.value]);

  return <InputTimeZone {...field} />;
};

export const Language = () => {
  const { language, update } = useSettings();
  const field = useField(language);

  useEffect(() => {
    update({ language: field.value });
  }, [update, field.value]);

  return <InputLanguage {...field} />;
};

export const UserRole = ({ field }: { field: Field<StaffRole> }) => {
  const roleOptions = useMemo(
    () =>
      Object.entries(StaffRole)
        .filter(([, value]) => !Number.isNaN(Number(value)))
        .map(([label, value]) => ({
          label,
          value: value.toString(),
        })),
    [],
  );

  return (
    <Select
      label="Role"
      options={roleOptions}
      value={field.value.toString()}
      onChange={(value) => field.onChange(parseInt(value, 10))}
    />
  );
};

export const AbilityPreview = ({
  children,
}: {
  children: (role: Field<StaffRole>) => ReactNode;
}) => {
  const role = useField<StaffRole>(StaffRole.admin);
  const ability = defineAbilityFor({
    isAdmin: role.value === StaffRole.admin,
    isOwner: role.value === StaffRole.owner,
    isUser: role.value === StaffRole.user,
    staff: "1",
  });

  return <AbilityProvider ability={ability}>{children(role)}</AbilityProvider>;
};
