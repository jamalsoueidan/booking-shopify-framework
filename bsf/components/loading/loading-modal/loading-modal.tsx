import React from "react";
import { AlphaStack, Spinner, Text } from "@shopify/polaris";
import { memo } from "react";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";

export interface LoadingModalProps {
  title?: string;
}

export const LoadingModal = memo(({ title }: LoadingModalProps) => {
  const { t } = useTranslation({ id: "loading-modal", locales });
  return (
    <>
      <div
        style={{
          position: "fixed",
          backgroundColor: "#e9e9e9",
          opacity: ".6",
          top: "0px",
          bottom: "0px",
          right: "0px",
          left: "0px",
          zIndex: 5,
        }}
      ></div>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 6,
        }}
      >
        <AlphaStack align="center" gap="2">
          <Spinner accessibilityLabel="Loading" hasFocusableParent={false} />
          <Text variant="bodySm" as="span">
            {title ? title : t("title")}
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
