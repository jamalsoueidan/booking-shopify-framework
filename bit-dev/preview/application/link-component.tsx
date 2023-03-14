import { LinkLikeComponentProps } from "@shopify/polaris/build/ts/latest/src/utilities/link";
import React from "react";
import { Link } from "react-router-dom";

export const LinkComponent = ({
  children,
  ...rest
}: LinkLikeComponentProps) => (
  <Link to={rest.url} relative="route" style={{ cursor: "pointer" }}>
    {children}
  </Link>
);
