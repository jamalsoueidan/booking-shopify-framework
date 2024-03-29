import { AbilityTuple, PureAbility } from "@casl/ability";
import { createContextualCan } from "@casl/react";
import { AppSession } from "@jamalsoueidan/backend.types.api";
import { Collection } from "@jamalsoueidan/backend.types.collection";
import { Product } from "@jamalsoueidan/backend.types.product";
import { Staff } from "@jamalsoueidan/backend.types.staff";

import { createContext } from "react";

export type AbilityUser = Pick<
  AppSession,
  "isAdmin" | "isOwner" | "isUser" | "onShopify" | "staff"
>;

export type AbilityActions = "manage" | "create" | "read" | "update" | "delete";
export type AbilitySubjects =
  | "product"
  | "staff"
  | "collection"
  | "shopify"
  | Staff
  | Product
  | Collection;

export type AbilityContextType = PureAbility<
  AbilityTuple<AbilityActions, AbilitySubjects>
>;

export const AbilityContext = createContext<AbilityContextType>(
  {} as AbilityContextType,
);

export const AbilityCan = createContextualCan(AbilityContext.Consumer);
