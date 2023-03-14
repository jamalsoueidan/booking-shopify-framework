import "@jamalsoueidan/frontend.polyfills.json";
import { Page } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import React from "react";
import { ApplicationWrapper } from "./application-wrapper";

export interface PreviewApplicationProps {
  children?: React.ReactNode;
  title?: string;
  initialEntries?: Array<string>;
  hideControls?: boolean;
}

export const Application = ({
  children,
  title,
  initialEntries,
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
      initialEntries={initialEntries}
    >
      <Page fullWidth title={title || ""}>
        {children}
      </Page>
    </ApplicationWrapper>
  );
};
