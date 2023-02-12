import { IProduct, ProductModel } from "@jamalsoueidan/bsb.services.product";
import {
  CollectionServiceCreateBodyProps,
  CollectionServiceDestroyProps,
  CollectionServiceGetAllReturn,
  ShopQuery,
  ShopifySession,
} from "@jamalsoueidan/bsb.types";
import { ShopifyApp } from "@shopify/shopify-app-express";
import { getCollection } from "./collection.helper";
import { CollectionModel } from "./collection.model";

export const CollectionServiceDestroy = async (
  query: CollectionServiceDestroyProps & ShopQuery,
) => {
  const { shop, id } = query;

  const collection = await CollectionModel.findOne({
    shop,
    _id: id,
  });

  if (collection) {
    await CollectionModel.deleteOne({ shop, _id: id });
    await ProductModel.updateMany(
      {
        collectionId: collection.collectionId,
      },
      {
        $set: {
          hidden: true,
          active: false,
        },
      },
    );
  }
  return null;
};

export const CollectionServiceCreate = async (
  query: {
    shopify: ShopifyApp<any, any>;
  } & { session: ShopifySession },
  body: CollectionServiceCreateBodyProps,
) => {
  const { shop } = query.session;

  const selections = body.selections;
  const collections = (
    await Promise.all(
      selections.map((id) =>
        getCollection({ shopify: query.shopify, session: query.session, id }),
      ),
    )
  ).filter((el) => el != null);

  const getGid = (value: string): number =>
    parseInt(value.substring(value.lastIndexOf("/") + 1));

  //TODO: What about the products that are removed from the collections, they needs to be removed also or moved?
  const collectionBulkWrite = collections?.map((c) => {
    return {
      updateOne: {
        filter: { collectionId: getGid(c.id) },
        update: {
          $set: { shop, title: c.title, collectionId: getGid(c.id) },
        },
        upsert: true,
      },
    };
  });

  const products = collections?.reduce<
    Array<Omit<IProduct, "buffertime" | "active" | "duration" | "staff">>
  >((products, currentCollection) => {
    currentCollection.products.nodes.forEach((n) => {
      products.push({
        shop,
        collectionId: getGid(currentCollection.id),
        productId: getGid(n.id),
        title: n.title,
        imageUrl: n.featuredImage?.url,
        hidden: false,
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

  const productsHide = cleanupProducts.map((product) => {
    return {
      updateOne: {
        filter: { _id: product._id },
        update: {
          $set: { hidden: true, active: false },
        },
      },
    };
  });

  const productsBulkWrite = products.map((product) => {
    return {
      updateOne: {
        filter: { productId: product.productId },
        update: {
          $set: product,
        },
        upsert: true,
      },
    };
  });

  await CollectionModel.bulkWrite(collectionBulkWrite);
  await ProductModel.bulkWrite([...productsBulkWrite, ...productsHide]);
};

export const CollectionServiceGetAll = () =>
  CollectionModel.aggregate<CollectionServiceGetAllReturn>([
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
        from: "Staff",
        localField: "products.staff.staff",
        foreignField: "_id",
        as: "products.foreignStaff",
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
            else: "$$REMOVE",
          },
        },
        "products.staff": {
          $cond: {
            if: { $gte: ["$products.foreignStaff", 0] },
            then: "$products.foreignStaff",
            else: "$$REMOVE",
          },
        },
      },
    },
    {
      $project: {
        "products.foreignStaff": 0,
      },
    },
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
    // { $sort: { title: 1 } },
  ]);
