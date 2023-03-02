import { PreviwApplication } from "@jamalsoueidan/bit-dev.preview.application";

import React, { ReactNode } from "react";

export type WithApplicationProps = {
  children?: ReactNode;
};

interface Options {
  title?: string;
  hideControls?: boolean;
}

export const withApplication =
  (WrappedComponent: any, options: Options = {}) =>
  ({ children, ...props }: WithApplicationProps) =>
    (
      <PreviwApplication {...options}>
        <WrappedComponent {...props}>{children}</WrappedComponent>
      </PreviwApplication>
    );
