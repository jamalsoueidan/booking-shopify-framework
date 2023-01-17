import { AlphaStack, Frame, Loading, Spinner } from "@shopify/polaris";
import React, { memo } from "react";

export type LoadingPageProps = {
  /**
   * a node to be rendered in the special component.
   */
  title: string;
};

export const LoadingPage = memo(({ title }: LoadingPageProps) => {
  return (
    <Frame>
      <Loading />
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <AlphaStack align="center" gap="2">
          <Spinner accessibilityLabel="Loading" hasFocusableParent={false} />
          {title}
        </AlphaStack>
      </div>
    </Frame>
  );
});
