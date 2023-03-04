import { PreviwApplication } from "@jamalsoueidan/bit-dev.preview.application";

import React, { ComponentType, ReactNode } from "react";

export type WithApplicationProps = {
  children?: ReactNode;
};

interface Options {
  title?: string;
  hideControls?: boolean;
}

export const withApplication =
  <T,>(WrappedComponent: ComponentType<T>, options: Options = {}) =>
  (props: T & WithApplicationProps) =>
    (
      <PreviwApplication {...options}>
        <WrappedComponent {...props} />
      </PreviwApplication>
    );
