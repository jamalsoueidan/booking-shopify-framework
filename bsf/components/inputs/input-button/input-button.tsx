import { Button, ButtonProps, LabelledProps } from "@shopify/polaris";
import React, { memo } from "react";

export interface InputButtonProps extends ButtonProps, Pick<LabelledProps, "error"> {}

const WithErrorWrapper = ({ error, children }) =>
  error ? (
    <>
      <style>
        {`
        .Button-Error {
          color: #bf0711;
        }
        .Button-Error > .Polaris-Button--monochrome.Polaris-Button--outline {
          border: 0;
          box-shadow: 0 0 0 var(--p-border-width-1) currentColor
        }
        .Button-Error .Polaris-Icon--applyColor {
          color: currentColor;
        }
        `}
      </style>
      <div className="Button-Error">{children}</div>
    </>
  ) : (
    children
  );

export const InputButton = memo(({ error, children, ...button }: InputButtonProps) => (
  <WithErrorWrapper error={error}>
    <Button monochrome={!!error} outline={!!error} {...button}>
      {children}
    </Button>
  </WithErrorWrapper>
));
