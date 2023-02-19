import { ShopifySessionModel } from "@jamalsoueidan/bsb.services.shopify-session";
import {
  CustomerServiceFindAndUpdateProps,
  CustomerServiceSearchProps,
  ShopQuery,
} from "@jamalsoueidan/bsb.types";
import { ShopifyApp } from "@shopify/shopify-app-express";
import { CustomerModel } from "./customer.model";

export const CustomerServiceFindAndUpdate = async ({
  shop,
  customerGraphqlApiId,
  customerId,
  shopify,
}: CustomerServiceFindAndUpdateProps &
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ShopQuery & { shopify: ShopifyApp<any, any> }) => {
  // customer saving
  const session = await ShopifySessionModel.findOne({ shop });

  // customer saving
  const client = new shopify.api.clients.Graphql({ session } as any);
  const customerData = await client.query<{ data: { customer: object } }>({
    data: {
      query: `
        query($id: ID!) {
          customer(id: $id) {
            firstName
            lastName
            email
            phone
          }
        }
      `,
      variables: {
        id: customerGraphqlApiId,
      },
    },
  });

  return CustomerModel.findOneAndUpdate(
    { customerId, shop },
    {
      customerId,
      shop,
      ...customerData.body.data.customer,
    },
    { new: true, upsert: true },
  );
};

export const CustomerServiceSearch = ({
  shop,
  name,
}: CustomerServiceSearchProps & ShopQuery) => {
  const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
  const searchRgx = rgx(name);

  return CustomerModel.find(
    {
      $or: [
        { firstName: { $options: "i", $regex: searchRgx } },
        { lastName: { $options: "i", $regex: searchRgx } },
      ],
      shop,
    },
    "customerId firstName lastName",
  )
    .limit(10)
    .lean();
};
