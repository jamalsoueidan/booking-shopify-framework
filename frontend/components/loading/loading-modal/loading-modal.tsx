import { useTranslation } from "@jamalsoueidan/frontend.hooks.use-translation";
import { AlphaStack, Spinner, Text } from "@shopify/polaris";
import React, { memo } from "react";

export interface LoadingModalProps {
  title?: string;
}

export const LoadingModal = memo(({ title }: LoadingModalProps) => {
  const { t } = useTranslation({ id: "loading-modal", locales });
  return (
    <>
      <div
        style={{
          backgroundColor: "#e9e9e9",
          bottom: "0px",
          left: "0px",
          opacity: ".6",
          position: "fixed",
          right: "0px",
          top: "0px",
          zIndex: 5,
        }}
      />
      <div
        style={{
          left: "50%",
          position: "fixed",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 6,
        }}
      >
        <AlphaStack align="center" gap="2">
          <Spinner accessibilityLabel="Loading" hasFocusableParent={false} />
          <Text variant="bodySm" as="span">
            {title || t("title")}
          </Text>
        </AlphaStack>
      </div>
    </>
  );
});

const locales = {
  da: {
    title: "Henter modal...",
  },
  en: {
    title: "Loading modal...",
  },
};
