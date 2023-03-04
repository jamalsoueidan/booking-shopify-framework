import { useTranslation } from "@jamalsoueidan/frontend.hooks.use-translation";
import { EmptyState } from "@shopify/polaris";
import React from "react";

export interface ProductStaffEmptyProps {
  action: () => void;
}

export const ProductStaffEmpty = ({ action }: ProductStaffEmptyProps) => {
  const { t } = useTranslation({
    id: "collections-staff-empty",
    locales: {
      da: {
        browse: "Vælge",
        title: "Der er ikke tilføjet brugere endnu.",
      },
      en: {
        browse: "Browse",
        title: "There is no staff added yet.",
      },
    },
  });

  return (
    <>
      <br />
      <EmptyState
        heading={t("title")}
        image="https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png"
        fullWidth
        action={{ content: t("browse"), onAction: action }}
      />
    </>
  );
};
