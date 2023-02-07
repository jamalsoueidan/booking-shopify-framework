export * from "./booking";
export * from "./cart";
export * from "./collection";
export * from "./customer";
export * from "./notification";
export * from "./notification-template";
export * from "./product";
export * from "./schedule";
export * from "./settings";
export * from "./shopify-session";
export * from "./staff";
export * from "./user";
export * from "./widget";

export interface ApiResponse<T> {
  success: boolean;
  error?: string;
  payload: T;
}

export interface ShopQuery {
  shop: string;
}

export type ControllerProps<Q = never, B = never, S = never> = Pick<
  {
    query: Q & ShopQuery;
    body: B;
    session: S;
  },
  (Q extends object ? "query" : never) | (B extends object ? "body" : never) | (S extends object ? "session" : never)
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

export interface ShopifySession {
  readonly id: string;
  shop: string;
  state: string;
  isOnline: boolean;
  scope?: string;
  expires?: Date;
  accessToken?: string;
}

export type AppControllerProps<Q = never, B = never> = ControllerProps<Q, B, AppSession>;

export type ShopifyControllerProps<Q = never, B = never> = ControllerProps<Q, B, ShopifySession>;
