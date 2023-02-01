import { Button, ButtonProps, LabelledProps } from "@shopify/polaris";
import React from "react";

export interface InputButtonProps extends ButtonProps, Pick<LabelledProps, "error"> {}

const WithErrorWrapper = ({ error, children }) =>
  error ? <span style={{ color: "#bf0711" }}>{children}</span> : children;

export const InputButton = ({ error, children, ...button }: InputButtonProps) => (
  <WithErrorWrapper error={error}>
    <Button monochrome={!!error} outline={!!error} {...button}>
      {children}
    </Button>
  </WithErrorWrapper>
);
