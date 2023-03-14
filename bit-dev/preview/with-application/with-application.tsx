import { Application } from "@jamalsoueidan/bit-dev.preview.application";
import { AlphaCard } from "@shopify/polaris";

import React, { ComponentType, ReactNode } from "react";

export type WithApplicationProps = {
  children?: ReactNode;
};

interface Options {
  title?: string;
  hideControls?: boolean;
  initialEntries?: Array<string>;
}

export const withApplication =
  <T,>(WrappedComponent: ComponentType<T>, options: Options = {}) =>
  (props: T & WithApplicationProps) =>
    (
      <Application {...options}>
        <WrappedComponent {...props} />
      </Application>
    );

export const withApplicationCard =
  <T,>(WrappedComponent: ComponentType<T>, options: Options = {}) =>
  (props: T & WithApplicationProps) =>
    (
      <Application {...options}>
        <AlphaCard>
          <WrappedComponent {...props} />
        </AlphaCard>
      </Application>
    );
