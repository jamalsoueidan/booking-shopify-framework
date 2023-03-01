import { Collection } from "@jamalsoueidan/backend.types.collection";
import mongoose, { Document, Model } from "mongoose";

export interface ICollection extends Omit<Collection, "_id"> {}

export interface ICollectionDocument extends ICollection, Document {}

export interface ICollectionModel extends Model<ICollectionDocument> {}

export const CollectionSchema = new mongoose.Schema<
  ICollectionDocument,
  ICollectionModel
>({
  collectionId: {
    index: true,
    required: true,
    type: Number,
  },
  shop: {
    index: true,
    required: true,
    type: String,
  },
  title: String,
});
