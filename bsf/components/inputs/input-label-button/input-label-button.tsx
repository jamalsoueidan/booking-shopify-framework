import { InputButton } from "@jamalsoueidan/bsf.components.inputs.input-button";
import { ButtonProps, Labelled, LabelledProps } from "@shopify/polaris";
import React, { memo, useId } from "react";

export interface InputLabelButtonProps {
  labelled: Omit<LabelledProps, "id">;
  button?: ButtonProps;
  children: ButtonProps["children"];
}

export const InputLabelButton = memo(({ labelled, children, button }: InputLabelButtonProps) => {
  const id = useId();

  return (
    <Labelled id={`${id}-button-with-error`} {...labelled}>
      <InputButton error={labelled?.error} {...button}>
        {children}
      </InputButton>
    </Labelled>
  );
});
