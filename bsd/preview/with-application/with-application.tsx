import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";

import React, { ReactNode } from "react";

export type WithApplicationProps = {
  children?: ReactNode;
};

interface Options {
  pageTitle?: string;
}

export const withApplication =
  (WrappedComponent: any, options: Options = {}) =>
  ({ children, ...props }: WithApplicationProps) =>
    (
      <ApplicationFramePage title={options?.pageTitle}>
        <WrappedComponent {...props}>{children}</WrappedComponent>
      </ApplicationFramePage>
    );
