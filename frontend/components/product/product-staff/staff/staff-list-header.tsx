import { useTranslation } from "@jamalsoueidan/frontend.hooks.use-translation";
import { AbilityCan } from "@jamalsoueidan/frontend.providers.ability";
import { Box, Button, Columns, Inline, Text } from "@shopify/polaris";
import { PlusMinor } from "@shopify/polaris-icons";
import React, { useContext } from "react";
import { FormContext } from "./form-context";

export type StaffListHeaderProps = {
  itemsLength: number;
  action: () => void;
};

export const StaffListHeader = ({
  itemsLength,
  action,
}: StaffListHeaderProps) => {
  const { t, tdynamic } = useTranslation({
    id: "product-staff-list",
    locales: {
      da: {
        browse: "Redigere medarbejder",
        staff: {
          other: "{count} medarbejder tilføjet",
          zero: "Tillføje medarbejder til dette produkt",
        },
        title: "Medarbejder",
      },
      en: {
        browse: "Edit staff",
        staff: {
          other: "{count} staff added",
          zero: "Add staff to this product",
        },
        title: "Staff",
      },
    },
  });

  const { product } = useContext(FormContext);

  return (
    <>
      <Box padding="4">
        <Text as="h1" variant="bodyLg" fontWeight="bold">
          {t("title")}
        </Text>
      </Box>
      <Box paddingInlineStart="4" paddingInlineEnd="4" paddingBlockEnd="4">
        <Columns columns={2}>
          <Inline blockAlign="center">
            <Text as="h2" variant="bodyLg">
              {tdynamic("staff", {
                count: itemsLength || 0,
              })}
            </Text>
          </Inline>
          <Inline align="end" blockAlign="center">
            <AbilityCan I="update" a="product" this={product}>
              <Button size="slim" onClick={action} outline icon={PlusMinor}>
                {t("browse")}
              </Button>
            </AbilityCan>
          </Inline>
        </Columns>
      </Box>
    </>
  );
};
