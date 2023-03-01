import { AbilityTuple, PureAbility } from "@casl/ability";
import { createContextualCan } from "@casl/react";
import { Product } from "@jamalsoueidan/backend.types.product";
import { Staff } from "@jamalsoueidan/backend.types.staff";
import { createContext } from "react";

export type AbilityActions = "manage" | "create" | "read" | "update" | "delete";
export type AbilitySubjects = "product" | "staff" | Staff | Product;

export type AbilityContextType = PureAbility<
  AbilityTuple<AbilityActions, AbilitySubjects>
>;

export const AbilityContext = createContext<AbilityContextType>(
  {} as AbilityContextType,
);

export const Can = createContextualCan(AbilityContext.Consumer);
