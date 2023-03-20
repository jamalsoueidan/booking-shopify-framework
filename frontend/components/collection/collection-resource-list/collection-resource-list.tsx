import { CollectionServiceGetAllReturn } from "@jamalsoueidan/backend.types.collection";
import { CollectionResourceItem } from "@jamalsoueidan/frontend.components.collection.collection-resource-item";
import { HelperArray } from "@jamalsoueidan/frontend.helpers.helper-array";
import { AlphaStack } from "@shopify/polaris";
import React, { memo, useMemo } from "react";

export interface CollectionResourceListProps {
  collections: CollectionServiceGetAllReturn[];
}

export const CollectionResourceList = memo(
  ({ collections }: CollectionResourceListProps) => {
    const sortedCollections = useMemo(() => {
      if (!collections) return [];
      return [...collections].sort(HelperArray.sortByText((d) => d.title));
    }, [collections]);

    return (
      <AlphaStack gap="8">
        {sortedCollections.map((collection) => (
          <CollectionResourceItem
            key={collection._id}
            collection={collection}
          />
        ))}
      </AlphaStack>
    );
  },
);
