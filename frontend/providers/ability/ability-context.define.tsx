import { AbilityBuilder, createMongoAbility } from "@casl/ability";
import { AppSession } from "@jamalsoueidan/backend.types.api";
import { AbilityContextType } from "./ability-context";

export const defineAbilityFor = (
  user: Pick<AppSession, "isAdmin" | "isOwner" | "isUser" | "staff">,
) => {
  const { can, build } = new AbilityBuilder<AbilityContextType>(
    createMongoAbility,
  );

  if (user.isOwner) {
    can("manage", "product");
    can("manage", "staff");
    can("manage", "collection");
  }

  if (user.isAdmin) {
    can("manage", "staff");
    can("update", "product");
  }

  if (user.isUser) {
    can("update", "staff", { _id: user.staff });
  }

  return build();
};
