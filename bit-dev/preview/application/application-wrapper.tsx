import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Preview } from "./preview";
import { FetchProvider, QueryProvider } from "./providers";

export interface ApplicationProps {
  children?: React.ReactNode;
  hideControls: boolean;
  initialEntries?: Array<string>;
  isLive?: boolean;
}

export const ApplicationWrapper = ({
  children,
  hideControls,
  initialEntries,
  isLive,
}: ApplicationProps) => (
  <MemoryRouter initialEntries={initialEntries}>
    <QueryProvider>
      <FetchProvider>
        <Preview hideControls={hideControls} isLive={isLive}>
          {children}
        </Preview>
      </FetchProvider>
    </QueryProvider>
  </MemoryRouter>
);
