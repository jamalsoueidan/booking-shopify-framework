import { CollectionEmpty } from "@jamalsoueidan/frontend.components.collection.collection-empty";
import { CollectionResourceList } from "@jamalsoueidan/frontend.components.collection.collection-resource-list";
import { CollectionResourcePicker } from "@jamalsoueidan/frontend.components.collection.collection-resource-picker";

import { useTranslation } from "@jamalsoueidan/frontend.hooks.use-translation";
import { useAbility } from "@jamalsoueidan/frontend.providers.ability";
import { useCollection } from "@jamalsoueidan/frontend.state.collection";
import { Page } from "@shopify/polaris";
import React, { useState } from "react";

export const List = () => {
  const [open, setOpen] = useState(false);
  const { data } = useCollection();
  const ability = useAbility();
  const { t } = useTranslation({ id: "collections", locales });

  if (!data || data?.length === 0) {
    return <CollectionEmpty />;
  }

  const onShopify = ability.can("manage", "shopify");

  return (
    <Page
      fullWidth
      title={t("title")}
      primaryAction={
        onShopify
          ? {
              content: t("add_collection"),
              onAction: () => setOpen(true),
            }
          : null
      }
    >
      {onShopify && <CollectionResourcePicker open={open} setOpen={setOpen} />}
      <CollectionResourceList collections={data} />
    </Page>
  );
};

const locales = {
  da: {
    add_collection: "Tilføj kategori",
    title: "Kategorier",
  },
  en: {
    add_collection: "Add Category",
    title: "Categories",
  },
};
