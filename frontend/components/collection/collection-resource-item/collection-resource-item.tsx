import { CollectionServiceGetAllReturn } from "@jamalsoueidan/backend.types.collection";
import { ModalConfirm } from "@jamalsoueidan/frontend.components.modal-confirm";
import { ProductResourceList } from "@jamalsoueidan/frontend.components.product.product-resource-list";
import { useTranslation } from "@jamalsoueidan/frontend.hooks.use-translation";
import { useAbility } from "@jamalsoueidan/frontend.providers.ability";
import { useCollectionDestroy } from "@jamalsoueidan/frontend.state.collection";
import {
  AlphaCard,
  Box,
  Button,
  Columns,
  Inline,
  Text,
} from "@shopify/polaris";
import React, { memo, useCallback, useState } from "react";

export interface CollectionResourceItemProps {
  collection: CollectionServiceGetAllReturn;
}

export const CollectionResourceItem = memo(
  ({ collection }: CollectionResourceItemProps) => {
    const [modalConfirm, setModalConfirm] = useState<JSX.Element>();
    const ability = useAbility();
    const { destroy } = useCollectionDestroy({ collectionId: collection._id });
    const { t } = useTranslation({ id: "collection-item", locales });

    const close = useCallback(
      async (shouldDestroy: boolean) => {
        if (shouldDestroy) {
          destroy();
        }
        setModalConfirm(undefined);
      },
      [destroy],
    );

    const removeCollection = useCallback(() => {
      setModalConfirm(<ModalConfirm show close={close} />);
    }, [close]);

    return (
      <>
        {modalConfirm}
        <AlphaCard padding="0">
          <Box
            paddingBlockStart="4"
            paddingInlineStart="4"
            paddingInlineEnd="4"
          >
            <Columns columns={2}>
              <Inline blockAlign="center">
                <Text as="h2" variant="bodyMd">
                  {collection.title}
                </Text>
              </Inline>
              <Inline align="end">
                {ability.can("delete", "collection") && (
                  <Button onClick={removeCollection} plain>
                    {t("remove_collection")}
                  </Button>
                )}
              </Inline>
            </Columns>
          </Box>
          <ProductResourceList items={collection.products} />
        </AlphaCard>
      </>
    );
  },
);

const locales = {
  da: {
    remove_collection: "Fjern",
  },
  en: {
    remove_collection: "Remove",
  },
};
