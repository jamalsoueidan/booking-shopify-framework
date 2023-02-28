import React, { useContext } from 'react';
import { AbilityProvider } from './ability-context-provider';
import { AbilityContext } from './ability-context';

export function MockComponent() {
  const theme = useContext(AbilityContext);

  return <div style={{ color: theme.color }}>this should be {theme.color}</div>;
}

export const BasicThemeUsage = () => {
  return (
    <AbilityProvider color="blue">
      <MockComponent />
    </AbilityProvider>
  );
};
