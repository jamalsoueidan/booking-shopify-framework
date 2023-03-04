import React, { useMemo } from "react";

import { Product } from "@jamalsoueidan/backend.types.product";
import { Staff } from "@jamalsoueidan/backend.types.staff";
import { ProductResourceItem } from "@jamalsoueidan/frontend.components.product.product-resource-item";
import { HelperArray } from "@jamalsoueidan/frontend.helpers.helper-array";
import styled from "styled-components";

export type ProductResourceListProps = {
  items: Array<Product<Staff>>;
};

const ProductResourceStyled = styled.div`
  > :first-child {
    padding-top: 1em;
  }
  > :last-child {
    padding-bottom: 1em;
  }
`;

export const ProductResourceList = ({ items }: ProductResourceListProps) => {
  const productsMarkup = useMemo(
    () =>
      [...items]
        .sort(HelperArray.sortByText((d) => d.title))
        .map((p) => <ProductResourceItem key={p._id} product={p} />),
    [items],
  );

  return <ProductResourceStyled>{productsMarkup}</ProductResourceStyled>;
};
