import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import React from "react";
import { CollectionResourceItem } from "./collection-resource-item";

export const BasicCollectionResourceItem = withApplication(() => (
  <CollectionResourceItem collection={collection} />
));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const collection: any = {
  _id: "640c364f99af0f9bc8af6075",
  collectionId: 425290039613,
  products: [
    {
      _id: "640c364f99af0f9bc8af60b5",
      active: true,
      buffertime: 0,
      collectionId: 425290039613,
      duration: 60,
      hidden: false,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0663/2315/3213/products/makeup_composition_overhead-732x549-thumbnail.jpg?v=1666211894",
      productId: 7961951273277,
      shop: "testeriphone.myshopify.com",
      staff: [
        {
          _id: "640c782bae4ae3f921c5c872",
          active: true,
          avatar:
            "https://media.allure.com/photos/5e4c50ec4001910008cfe535/4:3/w_2000,h_1500,c_limit/makeup-trends-lede.jpg",
          fullname: "sara soueidan",
          group: "all",
          phone: "4531317427",
          position: "1",
          postal: 8000,
          role: 3,
          shop: "testeriphone.myshopify.com",
        },
        {
          _id: "640c3580a44a7de77c8d17c6",
          active: true,
          avatar:
            "https://sm.ign.com/ign_tr/cover/a/avatar-the/avatar-the-way-of-water_8ky6.jpg",
          fullname: "jamals",
          group: "all",
          phone: "4531317428",
          position: "1",
          postal: 8000,
          role: 1,
          shop: "testeriphone.myshopify.com",
        },
      ],
      title: "Makeup",
    },
  ],
  shop: "testeriphone.myshopify.com",
  title: "Makeup",
};
