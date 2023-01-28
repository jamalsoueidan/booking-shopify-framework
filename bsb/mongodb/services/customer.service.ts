import { CustomerModel, ShopifySessionsModel } from "@jamalsoueidan/bsb.mongodb.models";
import Shopify from "@shopify/shopify-api";

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
  const session = await ShopifySessionsModel.findOne({ shop });

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
    { upsert: true, new: true },
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
      $or: [{ firstName: { $regex: searchRgx, $options: "i" } }, { lastName: { $regex: searchRgx, $options: "i" } }],
      shop,
    },
    "customerId firstName lastName",
  )
    .limit(10)
    .lean();
};
