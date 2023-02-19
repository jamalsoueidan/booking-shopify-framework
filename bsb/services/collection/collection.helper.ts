import { ShopifySession } from "@jamalsoueidan/pkg.bsb";
import { ShopifyApp } from "@shopify/shopify-app-express";

interface Product {
  id: string;
  title: string;
  featuredImage: {
    url: string;
  };
}

interface Collection {
  id: string;
  title: string;
  products: {
    nodes: Array<Product>;
  };
}

interface GetCollectionQuery {
  body: {
    data: {
      collection: Collection;
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

export interface GetCollectionProps {
  session: ShopifySession;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  shopify: ShopifyApp<any, any>;
  id: string;
}

export const getCollection = async ({
  session,
  shopify,
  id,
}: GetCollectionProps): Promise<Collection> => {
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
