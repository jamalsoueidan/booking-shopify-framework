import { Button, ButtonProps, LabelledProps } from "@shopify/polaris";
import React, { memo } from "react";
import "./style.css";

export interface InputButtonProps extends ButtonProps, Pick<LabelledProps, "error"> {}

const WithErrorWrapper = ({ error, children }) => (error ? <span className="Button-Error">{children}</span> : children);

export const InputButton = memo(({ error, children, ...button }: InputButtonProps) => (
  <WithErrorWrapper error={error}>
    <Button monochrome={!!error} outline={!!error} {...button}>
      {children}
    </Button>
  </WithErrorWrapper>
));
