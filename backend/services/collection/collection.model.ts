import mongoose, { Model } from "mongoose";
import { CollectionSchema, ICollectionDocument, ICollectionModel } from "./collection.schema";

// eslint-disable-next-line @typescript-eslint/ban-types
export const CollectionModel: Model<ICollectionDocument, {}, {}, {}, ICollectionModel> =
  mongoose.models.collection ||
  mongoose.model<ICollectionDocument, ICollectionModel>("collection", CollectionSchema, "Collection");
