import React, { ReactNode } from "react";
import { AbilityContext, AbilityContextType } from "./ability-context";

export type AbilityProviderProps = {
  ability: AbilityContextType;
  children: ReactNode;
};

export const AbilityProvider = ({
  ability,
  children,
}: AbilityProviderProps) => (
  <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
);
