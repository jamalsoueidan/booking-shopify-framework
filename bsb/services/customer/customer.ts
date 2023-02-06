import { ShopifySessionModel } from "@jamalsoueidan/bsb.services.shopify-session";
import Shopify from "@shopify/shopify-api";
import { CustomerModel } from "./customer.model";

const getCustomerQuery = `
  query($id: ID!) {
    customer(id: $id) {
      firstName
      lastName
      email
      phone
    }
  }
`;

interface FindCustomerAndUpdateProps {
  shop: string;
  customerGraphqlApiId: string;
  customerId: number;
}

export const CustomerServiceFindAndUpdate = async ({
  shop,
  customerGraphqlApiId,
  customerId,
}: FindCustomerAndUpdateProps) => {
  // customer saving
  const session = await ShopifySessionModel.findOne({ shop });

  const client = new Shopify.Clients.Graphql(session?.shop || "", session?.accessToken);
  const customerData = await client.query<{ data: { customer: object } }>({
    data: {
      query: getCustomerQuery,
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

interface FindCustomerProps {
  shop: string;
  name: string;
}

export const CustomerServiceFind = ({ shop, name }: FindCustomerProps) => {
  const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
  const searchRgx = rgx(name);

  return CustomerModel.find(
    {
      $or: [{ firstName: { $options: "i", $regex: searchRgx } }, { lastName: { $options: "i", $regex: searchRgx } }],
      shop,
    },
    "customerId firstName lastName",
  )
    .limit(10)
    .lean();
};
