import { StaffRole } from "@jamalsoueidan/backend.types.staff";
import {
  AbilityProvider,
  defineAbilityFor,
} from "@jamalsoueidan/frontend.providers.ability";
import { FetchProvider as FP } from "@jamalsoueidan/frontend.providers.fetch";
import { AppProvider } from "@shopify/polaris";
import da from "@shopify/polaris/locales/da.json";
import en from "@shopify/polaris/locales/en.json";
import { Field, useField } from "@shopify/react-form";
import { useI18n } from "@shopify/react-i18n";
import React, { ReactNode } from "react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { useFetch } from "./use-fetch";

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

export function QueryProvider({ children }: { children: ReactNode }) {
  const client = new QueryClient({
    mutationCache: new MutationCache(),
    queryCache: new QueryCache(),
  });

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export const FetchProvider = ({ children }: { children: ReactNode }) => {
  const fetch = useFetch();
  return <FP fetch={fetch}>{children}</FP>;
};
