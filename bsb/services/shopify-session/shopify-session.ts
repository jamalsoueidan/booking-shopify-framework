import { ShopifySession } from "@jamalsoueidan/bsb.types";
import mongoose, { Model } from "mongoose";

export interface IShopifySession extends ShopifySession {}

export interface IShopifySessionDocument extends IShopifySession, Document {}

export interface IShopifySessionModel extends Model<IShopifySessionDocument> {}

const ShopifySessionSchema = new mongoose.Schema<IShopifySessionDocument, IShopifySessionModel>({
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

// eslint-disable-next-line @typescript-eslint/ban-types
export const ShopifySessionModel: Model<IShopifySessionDocument, {}, {}, {}, IShopifySessionModel> =
  mongoose.models.shopify_sessions ||
  mongoose.model<IShopifySessionDocument, IShopifySessionModel>(
    "shopify_sessions",
    ShopifySessionSchema,
    "shopify_sessions",
  );
