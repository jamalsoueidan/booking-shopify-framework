import mongoose from "mongoose";

export interface IShopifySession {
  state: string;
  isOnline: boolean;
  shop: string;
  accessToken: string;
  scope: string;
}

export const ShopifySessionsSchema = new mongoose.Schema({
  id: String,
  state: String,
  shop: {
    type: String,
    required: true,
    index: true,
  },
  isOnline: Boolean,
  accessToken: String,
  scope: String,
});

export const ShopifySessionsModel = mongoose.model<IShopifySession>(
  "shopify_sessions",
  ShopifySessionsSchema,
  "shopify_sessions"
);
