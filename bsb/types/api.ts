import { ShopifySession } from "./shopify-session";

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
