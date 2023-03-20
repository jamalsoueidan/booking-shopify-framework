import { useTranslation } from "@jamalsoueidan/frontend.hooks.use-translation";
import { AlphaCard, EmptyState, Page } from "@shopify/polaris";
import React from "react";

export const CollectionEmpty = () => {
  const { t } = useTranslation({ id: "collection-empty", locales });

  return (
    <Page fullWidth title={t("title")}>
      <AlphaCard>
        <EmptyState
          image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
          heading={t("title")}
        >
          <p>{t("text")} 🚀</p>
        </EmptyState>
      </AlphaCard>
    </Page>
  );
};

const locales = {
  da: {
    choose_collections: "Ingen kollektion(er)",
    text: "Der er ikke tilføjet kollektioner endnu",
    title: "Begynd at tag imod reservationer i din butik.",
  },
  en: {
    choose_collections: "Choose collection(s)",
    text: "There is none collection(s) in store yet!",
    title: "Start collecting appointments on your store.",
  },
};
