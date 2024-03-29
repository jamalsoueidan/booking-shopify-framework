import { ShopifySession } from "@jamalsoueidan/backend.types.shopify-session";

export const isApplicationSession = (
  session: AppSession | ShopifySession,
): session is AppSession => (session as AppSession).staff !== undefined;

export interface ApiResponse<T> {
  success: boolean;
  error?: string;
  payload: T;
}

export type ShopQuery = {
  shop: string;
};

export type ControllerProps<Q = never, B = never, S = never> = Pick<
  {
    query: Q & ShopQuery;
    body: B;
    session: S;
  },
  | (Q extends object ? "query" : never)
  | (B extends object ? "body" : never)
  | (S extends object ? "session" : never)
>;

export interface AppSession {
  _id: string;
  staff: string;
  shop: string;
  role: number;
  group: string;
  iat?: number;
  exp?: number;
  isOwner: boolean;
  isAdmin: boolean;
  isUser: boolean;
  onShopify?: boolean; // in shopify app or external app?
}

export type AppControllerProps<Q = never, B = never> = ControllerProps<
  Q,
  B,
  AppSession
>;

export type ShopifyControllerProps<Q = never, B = never> = ControllerProps<
  Q,
  B,
  ShopifySession
>;
