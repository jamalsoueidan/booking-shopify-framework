import mongoose, { Document } from "mongoose";
import { Collection } from "@jamalsoueidan/bsb.mongodb.types";

export interface ICollectionModel extends Omit<Collection, "_id">, Document {}

export const CollectionSchema = new mongoose.Schema({
  shop: {
    type: String,
    required: true,
    index: true,
  },
  title: String,
  collectionId: {
    type: Number,
    required: true,
    index: true,
  },
});

export const CollectionModel = mongoose.model<ICollectionModel>(
  "collection",
  CollectionSchema,
  "Collection"
);
