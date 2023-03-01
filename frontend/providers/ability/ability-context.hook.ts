import { useAbility as useA } from "@casl/react";
import { AbilityContext } from "./ability-context";

export const useAbility = () => {
  const context = useA(AbilityContext);
  if (context === undefined) {
    throw new Error("useAbility must be used within a AbilityProvider");
  }

  return context;
};
