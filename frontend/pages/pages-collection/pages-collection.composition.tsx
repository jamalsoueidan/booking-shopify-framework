import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import React from "react";
import { PagesCollectionRoutes } from "./pages-collection";

export const Basic = withApplication(() => <PagesCollectionRoutes />, {
  initialEntries: ["/"],
  isLive: true,
  wrapPage: false,
});
