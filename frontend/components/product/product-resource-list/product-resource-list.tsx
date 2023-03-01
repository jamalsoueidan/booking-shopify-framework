import React from "react";

import { ProductResourceItem } from "@jamalsoueidan/frontend.components.product.product-resource-item";
import { Product, Staff } from "@jamalsoueidan/pkg.backend-types";
import { HelperArray } from "@jamalsoueidan/pkg.frontend";
import { useMemo } from "react";
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
