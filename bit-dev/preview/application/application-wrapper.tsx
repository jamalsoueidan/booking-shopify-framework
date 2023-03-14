import "@shopify/polaris/build/esm/styles.css";
import React from "react";
import { MemoryRouter } from "react-router";
import { Preview } from "./preview";
import { FetchProvider, QueryProvider } from "./providers";

export interface ApplicationProps {
  children?: React.ReactNode;
  hideControls: boolean;
  initialEntries?: Array<string>;
}

export const ApplicationWrapper = ({
  children,
  hideControls,
  initialEntries,
}: ApplicationProps) => (
  <MemoryRouter initialEntries={initialEntries}>
    <QueryProvider>
      <FetchProvider>
        <Preview hideControls={hideControls}>{children}</Preview>
      </FetchProvider>
    </QueryProvider>
  </MemoryRouter>
);
