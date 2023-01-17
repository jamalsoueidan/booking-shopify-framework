import React, { ReactNode } from "react";
import { I18nContext } from "@shopify/react-i18n";
export type ContextProps = {
  /**
   * a node to be rendered in the special component.
   */
  children?: ReactNode;
};

export function Context({ children }: ContextProps) {
  console.log(React.useContext(I18nContext));
  return <div>{children}</div>;
}
