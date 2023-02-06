import mongoose from "mongoose";
import { CollectionSchema, ICollectionDocument, ICollectionModel } from "./collection.schema";

export const CollectionModel = mongoose.model<ICollectionDocument, ICollectionModel>(
  "collection",
  CollectionSchema,
  "Collection",
);
