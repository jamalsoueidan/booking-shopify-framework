import { createContext } from 'react';

export type AbilityContextType = {
  /**
   * primary color of theme.
   */
  color?: string;
};

export const AbilityContext = createContext<AbilityContextType>({
  color: 'aqua'
});
