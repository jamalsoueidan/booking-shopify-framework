import { InputButton } from "@jamalsoueidan/bsf.components.inputs.input-button";
import { ButtonProps, Labelled, LabelledProps } from "@shopify/polaris";
import React, { useId } from "react";

export interface InputLabelButtonProps
  extends Pick<LabelledProps, "label" | "error" | "helpText">,
    Pick<ButtonProps, "children" | "onClick" | "loading"> {}

export const InputLabelButton = ({ label, error, helpText, children, ...button }: InputLabelButtonProps) => {
  const id = useId();

  return (
    <Labelled id={`${id}-button-with-error`} label={label} helpText={helpText} error={error}>
      <InputButton error={error} {...button}>
        {children}
      </InputButton>
    </Labelled>
  );
};
