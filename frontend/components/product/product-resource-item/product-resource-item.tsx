import { Product } from "@jamalsoueidan/backend.types.product";
import { Staff } from "@jamalsoueidan/backend.types.staff";
import { StaffAvatarStack } from "@jamalsoueidan/frontend.components.staff.staff-avatar-stack";
import { useTranslation } from "@jamalsoueidan/frontend.hooks.use-translation";
import { AbilityCan } from "@jamalsoueidan/frontend.providers.ability";

import {
  AlphaStack,
  Avatar,
  Badge,
  Box,
  Stack,
  Text,
  TextContainer,
} from "@shopify/polaris";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CollectionProductStyled = styled.div`
  padding: 0.5em 1em;
  cursor: pointer;
`;

export type ProductResourceItemProps = {
  product: Product<Staff>;
};

export const ProductResourceItem = ({ product }: ProductResourceItemProps) => {
  const { tdynamic } = useTranslation({ id: "collection-product", locales });
  const status = product.active ? "success" : "critical";
  const navigate = useNavigate();

  return (
    <CollectionProductStyled onClick={() => navigate(`product/${product._id}`)}>
      <AlphaStack fullWidth>
        <Box background="surface" border="divider" borderRadius="1" padding="2">
          <Stack alignment="center">
            <Avatar
              customer
              size="medium"
              source={`${product.imageUrl}&width=80`}
            />
            <Stack.Item fill>
              <TextContainer spacing="loose">
                <Text as="h1" variant="bodyLg">
                  {product.title}{" "}
                  <AbilityCan I="update" a="product">
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
              </TextContainer>
            </Stack.Item>
            <StaffAvatarStack staff={product.staff} size={"small"} />
          </Stack>
        </Box>
      </AlphaStack>
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
