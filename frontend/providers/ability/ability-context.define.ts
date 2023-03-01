import { AbilityBuilder, createMongoAbility } from "@casl/ability";
import { AppSession } from "@jamalsoueidan/backend.types.api";
import { AbilityContextType } from "./ability-context";

export const defineAbilityFor = (
  user: Pick<AppSession, "isAdmin" | "isOwner" | "isUser" | "staff">,
): AbilityContextType => {
  const { can, build } = new AbilityBuilder<AbilityContextType>(
    createMongoAbility,
  );

  if (user.isOwner) {
    can("manage", "product");
    can("manage", "staff");
  }

  if (user.isAdmin) {
    can("read", "product");
    can("update", "product");
    can("manage", "staff");
  }

  if (user.isUser) {
    can("read", "staff");
    can("update", "staff", { _id: user.staff });
  }

  return build();
};
