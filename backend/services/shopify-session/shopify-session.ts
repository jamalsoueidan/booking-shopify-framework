/* eslint-disable @typescript-eslint/ban-types */
import { ShopifySession } from "@jamalsoueidan/backend.types.shopify-session";
import mongoose, { Model } from "mongoose";

export interface IShopifySession extends ShopifySession {}

export interface IShopifySessionDocument extends IShopifySession, Document {}

export interface IShopifySessionModel extends Model<IShopifySessionDocument> {}

const ShopifySessionSchema = new mongoose.Schema<
  IShopifySessionDocument,
  IShopifySessionModel
>({
  accessToken: String,
  id: String,
  isOnline: Boolean,
  scope: String,
  shop: {
    index: true,
    required: true,
    type: String,
  },
  state: String,
});

export const ShopifySessionModel: Model<
  IShopifySessionDocument,
  {},
  {},
  {},
  IShopifySessionModel
> =
  mongoose.models.shopify_sessions ||
  mongoose.model<IShopifySessionDocument, IShopifySessionModel>(
    "shopify_sessions",
    ShopifySessionSchema,
    "shopify_sessions",
  );
