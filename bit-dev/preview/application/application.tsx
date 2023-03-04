import { Page } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import React from "react";
import { ApplicationWrapper } from "./application.helper";

export interface PreviewApplicationProps {
  children?: React.ReactNode;
  title?: string;
  hideControls?: boolean;
}

export const PreviwApplication = ({
  children,
  title,
  hideControls,
}: PreviewApplicationProps) => {
  const h = window.location.href;
  const isOnProfile = h.endsWith("compositions&");
  const isOnOverview = h.includes("viewport");
  const isOnDoc = h.includes("=overview");
  return (
    <ApplicationWrapper
      hideControls={
        isOnProfile || isOnOverview || isOnDoc || hideControls === true
      }
    >
      <Page fullWidth title={title || ""}>
        {children}
      </Page>
    </ApplicationWrapper>
  );
};
