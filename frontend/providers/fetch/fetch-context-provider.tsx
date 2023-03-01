import React, { ReactNode } from "react";
import { FetchContext, FetchContextType } from "./fetch-context";

export type FetchProviderProps = {
  fetch: FetchContextType;
  children: ReactNode;
};

export function FetchProvider({ fetch, children }: FetchProviderProps) {
  return (
    <FetchContext.Provider value={fetch}>{children}</FetchContext.Provider>
  );
}
