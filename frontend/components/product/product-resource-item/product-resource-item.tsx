/* eslint-disable jsx-a11y/anchor-is-valid */
import { Product } from "@jamalsoueidan/backend.types.product";
import { Staff } from "@jamalsoueidan/backend.types.staff";
import { StaffAvatarStack } from "@jamalsoueidan/frontend.components.staff.staff-avatar-stack";
import { useTranslation } from "@jamalsoueidan/frontend.hooks.use-translation";
import { AbilityCan } from "@jamalsoueidan/frontend.providers.ability";
import { Link } from "@jamalsoueidan/frontend.providers.settings";
import { AlphaStack, Avatar, Badge, Box, Inline, Text } from "@shopify/polaris";
import React from "react";
import styled from "styled-components";

const CollectionProductStyled = styled.div`
  padding: 0.5em 1em;
`;

export type ProductResourceItemProps = {
  product: Product<Staff>;
};

export const ProductResourceItem = ({ product }: ProductResourceItemProps) => {
  const { tdynamic } = useTranslation({ id: "collection-product", locales });
  const status = product.active ? "success" : "critical";

  return (
    <CollectionProductStyled>
      <Link url={`product/${product._id}`}>
        <AlphaStack>
          <Box
            background="surface"
            border="divider"
            borderRadius="1"
            padding="2"
          >
            <Inline gap="2">
              <Avatar
                customer
                size="medium"
                source={`${product.imageUrl}&width=80`}
              />
              <AlphaStack>
                <Text as="h1" variant="bodyLg">
                  {product.title}{" "}
                  <AbilityCan I="update" a="product" this={product}>
                    <Badge status={status}>
                      {product.active ? "Active" : "Deactive"}
                    </Badge>
                  </AbilityCan>
                </Text>
                <Text as="span" variant="bodyMd" color="subdued">
                  {tdynamic("staff", {
                    count: product.staff?.length || 0,
                  })}
                </Text>
              </AlphaStack>
              <StaffAvatarStack
                staff={product.staff}
                size="small"
                align="right"
              />
            </Inline>
          </Box>
        </AlphaStack>
      </Link>
    </CollectionProductStyled>
  );
};

const locales = {
  da: {
    staff: {
      other: "{count} medarbejder tilføjet",
      zero: "Tillføje medarbejder til dette produkt",
    },
  },
  en: {
    staff: {
      other: "{count} staff added",
      zero: "Add staff to this product",
    },
  },
};
