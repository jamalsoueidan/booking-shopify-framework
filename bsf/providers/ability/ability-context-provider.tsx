import React, { ReactNode } from 'react';
import { AbilityContext } from './ability-context';

export type AbilityProviderProps = {
  /**
   * primary color of theme.
   */
  color?: string,

  /**
   * children to be rendered within this theme.
   */
  children: ReactNode
};

export function AbilityProvider({ color, children }: AbilityProviderProps) {
  return <AbilityContext.Provider value={{ color }}>{children}</AbilityContext.Provider>
}
