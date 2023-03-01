export interface ShopifySession {
  readonly id: string;
  shop: string;
  state: string;
  isOnline: boolean;
  scope?: string;
  expires?: Date;
  accessToken?: string;
  shopify: any;
}
