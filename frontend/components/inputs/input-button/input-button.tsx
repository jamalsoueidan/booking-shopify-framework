import { Button, ButtonProps, Error, LabelledProps } from "@shopify/polaris";
import React, { memo } from "react";
import "./style.css";

export interface InputButtonProps extends ButtonProps, Pick<LabelledProps, "error"> {}

interface WithErrorWrapperProps {
  error?: Error | boolean;
  children: JSX.Element;
}

const WithErrorWrapper = ({ error, children }: WithErrorWrapperProps) =>
  error ? <span className="Button-Error">{children}</span> : children;

export const InputButton = memo(({ error, children, ...button }: InputButtonProps) => (
  <WithErrorWrapper error={error}>
    <Button monochrome={!!error} outline={!!error} {...button}>
      {children}
    </Button>
  </WithErrorWrapper>
));
