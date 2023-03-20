import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import React from "react";
import { CollectionResourceList } from "./collection-resource-list";
import { mockup } from "./mockup";

export const BasicCollectionResourceList = withApplication(() => (
  <CollectionResourceList collections={mockup} />
));
