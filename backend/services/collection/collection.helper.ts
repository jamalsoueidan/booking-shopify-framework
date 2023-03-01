import { ShopifySession } from "@jamalsoueidan/backend.types.shopify-session";
import { ShopifyApp } from "@shopify/shopify-app-express";

interface ShopifyProduct {
  id: string;
  title: string;
  featuredImage?: {
    url?: string;
  };
}

export interface ShopifyCollection {
  id: string;
  title: string;
  products: {
    nodes: Array<ShopifyProduct>;
  };
}

interface GetCollectionQuery {
  body: {
    data: {
      collection: ShopifyCollection;
    };
  };
}

const getCollectionQuery = `
  query collectionFind($id: ID!) {
    collection(id: $id) {
      id
      title
      products(first: 50) {
        nodes {
          id
          title
          featuredImage {
            url
          }
        }
      }
    }
  }
`;

export interface QueryShopifyProps {
  session: ShopifySession;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  shopify: ShopifyApp<any, any>;
  id: string;
}

export const queryShopify = async ({
  session,
  shopify,
  id,
}: QueryShopifyProps): Promise<ShopifyCollection> => {
  const client = new shopify.api.clients.Graphql({ session } as any);

  const payload: GetCollectionQuery = await client.query({
    data: {
      query: getCollectionQuery,
      variables: {
        id,
      },
    },
  });

  return payload.body.data.collection;
};

export interface GetCollectionsProps {
  session: ShopifySession;
  selections: string[];
  shopify: ShopifyApp<any, any>;
}

export const getCollections = async ({
  session,
  selections,
  shopify,
}: GetCollectionsProps) => {
  return (
    await Promise.all(
      selections.map((id) => queryShopify({ id, session, shopify })),
    )
  ).filter((el) => el != null);
};
