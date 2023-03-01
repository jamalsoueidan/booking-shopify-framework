import {
  IProduct,
  ProductModel,
} from "@jamalsoueidan/backend.services.product";
import { ShopQuery } from "@jamalsoueidan/backend.types.api";
import {
  CollectionServiceCreateBodyProps,
  CollectionServiceDestroyProps,
  CollectionServiceGetAllProps,
  CollectionServiceGetAllReturn,
} from "@jamalsoueidan/backend.types.collection";
import { ShopifySession } from "@jamalsoueidan/backend.types.shopify-session";
import { PipelineStage } from "mongoose";
import { ShopifyCollection, getCollections } from "./collection.helper";
import { CollectionModel } from "./collection.model";

export const CollectionServiceDestroy = async (
  query: CollectionServiceDestroyProps & ShopQuery,
) => {
  const { shop, id } = query;

  const collection = await CollectionModel.findOne({
    _id: id,
    shop,
  });

  if (collection) {
    await CollectionModel.deleteOne({ _id: id, shop });
    await ProductModel.updateMany(
      {
        collectionId: collection.collectionId,
      },
      {
        $set: {
          active: false,
          hidden: true,
        },
      },
    );
  }
  return null;
};

export const CollectionServiceCreate = async (
  query: { session: ShopifySession },
  body: CollectionServiceCreateBodyProps,
) => {
  const { shop } = query.session;

  const collections = await getCollections({
    session: query.session,
    shopify: query.session.shopify,
    selections: body.selections,
  });

  await CollectionServerCreateBulk({ collections, shop });
};

interface CollectionServerCreateBulkProps {
  collections: ShopifyCollection[];
  shop: string;
}

export const CollectionServerCreateBulk = async ({
  collections,
  shop,
}: CollectionServerCreateBulkProps) => {
  const getGid = (value: string): number =>
    parseInt(value.substring(value.lastIndexOf("/") + 1), 10);

  // TODO: What about the products that are removed from the collections, they needs to be removed also or moved?
  const collectionBulkWrite = collections?.map((c) => ({
    updateOne: {
      filter: { collectionId: getGid(c.id) },
      update: {
        $set: { collectionId: getGid(c.id), shop, title: c.title },
      },
      upsert: true,
    },
  }));

  const products = collections?.reduce<
    Array<Omit<IProduct, "buffertime" | "active" | "duration" | "staff">>
  >((products, currentCollection) => {
    currentCollection.products.nodes.forEach((n) => {
      products.push({
        collectionId: getGid(currentCollection.id),
        hidden: false,
        imageUrl: n.featuredImage?.url || "",
        productId: getGid(n.id),
        shop,
        title: n.title,
      });
    });
    return products;
  }, []);

  let cleanupProducts = await ProductModel.find(
    { collectionId: { $in: products?.map((p) => p.collectionId) } },
    "collectionId productId",
  );

  cleanupProducts = cleanupProducts.filter(
    (p) =>
      !products.find(
        (pp) =>
          pp.collectionId === p.collectionId && pp.productId === p.productId,
      ),
  );

  const productsHide = cleanupProducts.map((product) => ({
    updateOne: {
      filter: { _id: product._id },
      update: {
        $set: { active: false, hidden: true },
      },
    },
  }));

  const productsBulkWrite = products.map((product) => ({
    updateOne: {
      filter: { productId: product.productId },
      update: {
        $set: product,
      },
      upsert: true,
    },
  }));

  await CollectionModel.bulkWrite(collectionBulkWrite);
  await ProductModel.bulkWrite([...productsBulkWrite, ...productsHide]);
};

export const CollectionServiceGetAll = ({
  group,
  shop,
}: CollectionServiceGetAllProps & ShopQuery) => {
  let pipeline: PipelineStage[] = [
    {
      $match: {
        shop,
      },
    },
    {
      $lookup: {
        from: "Product",
        let: { cID: "$collectionId" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$collectionId", "$$cID"] },
                  { $eq: ["$hidden", false] },
                ],
              },
            },
          },
        ],
        // eslint-disable-next-line sort-keys/sort-keys-fix
        as: "products",
      },
    },
    {
      $unwind: { path: "$products" },
    },
    {
      $unwind: { path: "$products.staff", preserveNullAndEmptyArrays: true },
    },
    {
      $lookup: {
        as: "products.foreignStaff",
        foreignField: "_id",
        from: "Staff",
        localField: "products.staff.staff",
      },
    },
    {
      $unwind: {
        path: "$products.foreignStaff",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $addFields: {
        "products.foreignStaff.tag": {
          $cond: {
            if: { $gte: ["$products.staff.tag", 0] },
            then: "$products.staff.tag",
            // eslint-disable-next-line sort-keys/sort-keys-fix
            else: "$$REMOVE",
          },
        },
        "products.staff": {
          $cond: {
            if: { $gte: ["$products.foreignStaff", 0] },
            then: "$products.foreignStaff",
            // eslint-disable-next-line sort-keys/sort-keys-fix
            else: "$$REMOVE",
          },
        },
      },
    },
    {
      $project: {
        "products.foreignStaff": 0,
        "products.staff.address": 0,
        "products.staff.email": 0,
        "products.staff.language": 0,
        "products.staff.password": 0,
        "products.staff.timeZone": 0,
      },
    },
  ];

  if (group) {
    pipeline.push({
      $match: {
        "products.staff.group": group,
      },
    });
  }

  pipeline = [...pipeline, ...restAggreate];

  return CollectionModel.aggregate<CollectionServiceGetAllReturn>(pipeline);
};

const restAggreate = [
  // { $sort: { "products.staff.fullname": 1 } },
  {
    $group: {
      _id: {
        _id: "$_id",
        products: "$products._id",
      },
      collection: { $first: "$$ROOT" },
      staff: { $push: "$products.staff" },
    },
  },
  {
    $addFields: {
      "collection.products.staff": "$staff",
    },
  },
  {
    $project: {
      _id: 0,
      staff: 0,
    },
  },
  // { $sort: { "products.title": 1 } },
  { $replaceRoot: { newRoot: "$collection" } },
  {
    $group: {
      _id: "$_id",
      collection: { $first: "$$ROOT" },
      products: { $push: "$products" },
    },
  },
  {
    $addFields: {
      "collection.products": "$products",
    },
  },
  {
    $project: {
      products: 0,
    },
  },
  { $replaceRoot: { newRoot: "$collection" } },
  // { $sort: { title: 1 } }
];
