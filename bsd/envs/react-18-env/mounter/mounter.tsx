import React, { ComponentType, ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";

// @ts-ignore

export type MounterProvider = ComponentType<{ children: ReactNode }>;

/**
 * create a mounter.
 * https://bit.cloud/teambit/react/react-env/~code/preview/mounter.tsx
 */
export function createMounter(Provider: MounterProvider = React.Fragment): any {
  return (Composition: React.ComponentType) => {
    const rootDoc = document.getElementById("root");
    const root = createRoot(rootDoc!);
    root.render(
      // @ts-ignore TODO: remove this after release.
      <ErrorBoundary fallback={<>Error</>}>
        <Provider>
          <Composition />
        </Provider>
      </ErrorBoundary>
    );
  };
}

/**
 * use the mounter to inject and wrap your component previews
 * with common needs like [routing](), [theming]() and [data fetching]().
 */
// eslint-disable-next-line react/prop-types
export function MyReactProvider({ children }) {
  return <>{children}</>;
}

/**
 * to replace that mounter component for different purposes, just return a function
 * that uses ReactDOM to render a node to a div.
 */
// @ts-ignore
export default createMounter(MyReactProvider) as any;
