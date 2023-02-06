export interface ShopifySession {
  id: string;
  state: string;
  isOnline: boolean;
  shop: string;
  accessToken: string;
  scope: string;
}
