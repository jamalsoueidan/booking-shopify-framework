import "@jamalsoueidan/frontend.polyfills.json";
import { Page } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import React from "react";
import { ApplicationWrapper } from "./application-wrapper";

export interface ApplicationOptionsProps {
  title?: string;
  isLive?: boolean;
  initialEntries?: Array<string>;
  wrapPage?: boolean;
  hideControls?: boolean;
}

export interface ApplicationProps extends ApplicationOptionsProps {
  children?: React.ReactNode;
}

export const Application = ({
  children,
  title,
  initialEntries,
  wrapPage = true,
  isLive = false,
  hideControls,
}: ApplicationProps) => {
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
      isLive={isLive}
    >
      {wrapPage ? (
        <Page fullWidth title={title || ""}>
          {children}
        </Page>
      ) : (
        children
      )}
    </ApplicationWrapper>
  );
};
